package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/model/converter"
	"backend/internal/repository"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/insanXYZ/sage"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"io"
	"mime/multipart"
	"os"
	"strings"
)

type ProductService struct {
	DB                     *gorm.DB
	Log                    *logrus.Logger
	Validate               *validator.Validate
	ProductRepository      *repository.ProductRepository
	UserRepository         *repository.UserRepository
	ImageProductRepository *repository.ImageProductRepository
	UserCartedRepository   *repository.UserCartedProductRepository
}

func NewProductService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, productRepository *repository.ProductRepository, userRepository *repository.UserRepository, imageProductRepository *repository.ImageProductRepository, cartedProductRepository *repository.UserCartedProductRepository) *ProductService {
	return &ProductService{
		DB:                     db,
		Log:                    log,
		Validate:               validate,
		ProductRepository:      productRepository,
		UserRepository:         userRepository,
		ImageProductRepository: imageProductRepository,
		UserCartedRepository:   cartedProductRepository,
	}
}

func (service *ProductService) GetAll(filter *model.FilterQueryParamProduct) ([]*model.ProductResponse, error) {
	var products []entity.Product
	err := service.ProductRepository.GetAllWithManyRelations(&products, service.DB, filter)
	if err != nil {
		return nil, err
	}

	res := make([]*model.ProductResponse, len(products))
	for i, product := range products {
		res[i] = converter.ProductToResponse(&product)
	}

	return res, nil
}

func (service *ProductService) GetDetails(claims interface{}, req *model.GetDetailsProduct) (*model.ProductResponse, error) {
	cl, ok := claims.(jwt.MapClaims)
	product := new(entity.Product)

	err := service.ProductRepository.GetByIdWithManyRelations(product, req.ID, service.DB)
	if err != nil {
		return nil, err
	}

	if ok {
		return converter.ProductToResponse(product, cl["sub"].(string)), nil
	}

	return converter.ProductToResponse(product), nil

}

func (service *ProductService) Delete(req *model.DeleteProduct) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	product := new(entity.Product)
	err = service.ProductRepository.TakeById(service.DB, product, req.ID)
	if err != nil {
		return err
	}

	err = service.ProductRepository.Delete(service.DB, product)
	return err
}

func (service *ProductService) Liked(claims jwt.MapClaims, req *model.LikedProduct) (string, error) {
	user := new(entity.User)
	product := new(entity.Product)
	var message string

	err := service.ProductRepository.TakeById(service.DB, product, req.ID)
	if err != nil {
		return "", err
	}

	err = service.UserRepository.TakeById(service.DB, user, claims["sub"].(string))
	if err != nil {
		return "", err
	}

	if count := service.ProductRepository.CountRelationLikedByUserWithUserId(service.DB, product, user.ID); count == 0 {
		err := service.ProductRepository.LikedProduct(service.DB, user, product)
		if err != nil {
			return "", err
		}
		message = "success liked product"
	} else {
		err := service.ProductRepository.UnlikedProduct(service.DB, user, product)
		if err != nil {
			return "", err
		}
		message = "success unliked product"
	}

	return message, nil
}

func (service *ProductService) Create(req *model.CreateProduct, images []*multipart.FileHeader) error {
	if err := service.Validate.Struct(req); err != nil {
		return err
	}

	err := service.DB.Transaction(func(tx *gorm.DB) error {
		product := &entity.Product{
			ID:          uuid.New().String(),
			Name:        req.Name,
			Price:       req.Price,
			Qty:         req.Qty,
			CategoryID:  req.CategoryID,
			Description: req.Description,
		}

		err := service.ProductRepository.Create(tx, product)
		if err != nil {
			return err
		}

		for _, header := range images {
			err := sage.Validate(header)
			if err != nil {
				return err
			}

			filename := uuid.New().String() + "-" + req.Name + "." + strings.Split(header.Filename, ".")[len(strings.Split(header.Filename, "."))-1]

			image := &entity.ImageProduct{
				Name:      filename,
				ProductID: product.ID,
			}

			err = service.ImageProductRepository.Create(tx, image)
			if err != nil {
				return err
			}

			dsn, err := os.Create("storage/app/product/" + filename)
			if err != nil {
				return err
			}

			open, err := header.Open()
			if err != nil {
				return err
			}

			_, err = io.Copy(dsn, open)
			if err != nil {
				return err
			}
			dsn.Close()
			open.Close()

		}

		return nil
	})

	return err

}

func (service *ProductService) Update(req *model.UpdateProduct, images []*multipart.FileHeader) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	err = service.DB.Transaction(func(tx *gorm.DB) error {

		product := new(entity.Product)
		product.ID = req.ID

		err := service.ProductRepository.Take(tx, product)
		if err != nil {
			return err
		}

		err = service.ProductRepository.Update(tx, product, &entity.Product{
			Name:        req.Name,
			Price:       req.Price,
			Qty:         req.Qty,
			CategoryID:  req.CategoryID,
			Description: req.Description,
		})

		if err != nil {
			return err
		}

		if len(images) != 0 {

			err := service.ImageProductRepository.DeleteByProductId(tx, product.ID)
			if err != nil {
				return err
			}

			for _, header := range images {
				err := sage.Validate(header)
				if err != nil {
					return err
				}

				filename := uuid.New().String() + "-" + product.Name + "." + strings.Split(header.Filename, ".")[len(strings.Split(header.Filename, "."))-1]

				image := &entity.ImageProduct{
					Name:      filename,
					ProductID: product.ID,
				}

				err = service.ImageProductRepository.Create(tx, image)
				if err != nil {
					return err
				}

				dsn, err := os.Create("storage/app/product/" + filename)
				if err != nil {
					return err
				}

				open, err := header.Open()
				if err != nil {
					return err
				}

				_, err = io.Copy(dsn, open)
				if err != nil {
					return err
				}
				dsn.Close()
				open.Close()

			}

		}

		return nil

	})
	return err
}
