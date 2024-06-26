package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/model/converter"
	"backend/internal/repository"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/insanXYZ/sage"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"io"
	"os"
	"time"
)

type UserService struct {
	DB             *gorm.DB
	Log            *logrus.Logger
	Validate       *validator.Validate
	UserRepository *repository.UserRepository
	viper          *viper.Viper
}

func NewUserService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, repo *repository.UserRepository, viper *viper.Viper) *UserService {
	return &UserService{
		DB:             db,
		Log:            log,
		Validate:       validate,
		UserRepository: repo,
		viper:          viper,
	}
}

func (service *UserService) Login(request *model.LoginRequest) (string, error) {
	err := service.Validate.Struct(request)
	if err != nil {
		return "", err
	}

	user := new(entity.User)
	err = service.UserRepository.TakeByEmail(service.DB, user, request.Email)
	if err != nil {
		return "", errors.New("email or password wrong")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		return "", err
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID,
		"name": user.Name,
		"role": user.Role,
		"exp":  time.Now().Add(time.Duration(service.viper.GetInt("EXP_JWT")) * time.Minute).Unix(),
	})

	signedString, err := claims.SignedString([]byte(service.viper.GetString("SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return signedString, nil
}

func (service *UserService) Register(request *model.SignUpRequest) error {
	err := service.Validate.Struct(request)
	if err != nil {
		return err
	}

	if err = service.UserRepository.TakeByEmail(service.DB, &entity.User{}, request.Email); err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		pass, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		user := entity.User{
			ID:       uuid.New().String(),
			Role:     "Member",
			Name:     request.Name,
			Image:    "profile.jpeg",
			Email:    request.Email,
			Password: string(pass),
		}
		err = service.UserRepository.Create(service.DB, &user)
		return err
	}
	return err
}

func (service *UserService) Refresh(claims jwt.MapClaims) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  claims["sub"],
		"name": claims["name"],
		"role": claims["role"],
		"exp":  time.Now().Add(time.Duration(service.viper.GetInt("EXP_JWT")) * time.Minute).Unix(),
	})

	signedString, err := token.SignedString([]byte(service.viper.GetString("SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return signedString, nil
}

func (service *UserService) GetUser(claims jwt.MapClaims) (*model.UserResponse, error) {
	user := new(entity.User)
	if err := service.UserRepository.TakeById(service.DB, user, claims["sub"]); err != nil {
		return nil, err
	}

	return converter.UserToResponse(user), nil
}

func (service *UserService) UpdateUser(c echo.Context, claims jwt.MapClaims, req *model.UpdateUser) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	file, errFile := c.FormFile("image")

	err = service.DB.Transaction(func(tx *gorm.DB) error {

		user := new(entity.User)

		err := service.UserRepository.TakeById(tx, user, claims["sub"])
		if err != nil {
			return err
		}

		data := new(entity.User)
		data.Name = req.Name
		data.Email = req.Email

		if errFile == nil { // file not empty
			err := sage.Validate(file)
			if err != nil {
				return err
			}

			filename := claims["sub"].(string) + "-" + file.Filename
			data.Image = filename

			dsn, err := os.Create("storage/app/user/" + filename)
			if err != nil {
				return err
			}

			defer dsn.Close()

			open, err := file.Open()
			if err != nil {
				return err
			}
			defer open.Close()

			_, err = io.Copy(dsn, open)
			if err != nil {
				return err
			}

		}

		err = service.UserRepository.Update(tx, user, data)
		return err
	})

	return err
}

func (service *UserService) UpdatePassword(claims jwt.MapClaims, req *model.UpdatePassword) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	user := new(entity.User)

	err = service.UserRepository.TakeById(service.DB, user, claims["sub"].(string))
	if err != nil {
		return err
	}

	err = service.UserRepository.Update(service.DB, user, &entity.User{
		Password: req.NewPassword,
	})
	return err
}

func (service *UserService) GetLikedProduct(claims jwt.MapClaims) ([]*model.ProductResponse, error) {
	user := new(entity.User)
	err := service.UserRepository.TakeById(service.DB, user, claims["sub"].(string))
	if err != nil {
		return nil, err
	}
	var products []*entity.Product
	err = service.UserRepository.FindAssociationLikeProduct(service.DB, user, &products)
	if err != nil {
		return nil, err
	}

	res := make([]*model.ProductResponse, len(products))
	for i, product := range products {
		res[i] = converter.ProductToResponse(product)
	}

	return res, nil
}

func (service *UserService) GetCartedProduct(claims jwt.MapClaims) ([]*model.UserCartedProductResponse, error) {
	user := new(entity.User)
	err := service.UserRepository.TakeById(service.DB, user, claims["sub"].(string))
	if err != nil {
		return nil, err
	}
	err = service.UserRepository.TakePreloadCartedProduct(service.DB, user)
	if err != nil {
		return nil, err
	}

	res := make([]*model.UserCartedProductResponse, len(user.CartedProduct))
	for i, product := range user.CartedProduct {
		res[i] = converter.UserCartedProductToResponse(product)
	}

	return res, nil
}
