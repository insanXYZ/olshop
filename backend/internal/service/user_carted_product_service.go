package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/repository"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"strconv"
)

type UserCartedProductService struct {
	DB                   *gorm.DB
	Log                  *logrus.Logger
	Validate             *validator.Validate
	ProductRepository    *repository.ProductRepository
	UserRepository       *repository.UserRepository
	UserCartedRepository *repository.UserCartedProductRepository
}

func NewUserCartedProductService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, productRepository *repository.ProductRepository, userRepository *repository.UserRepository, cartedProductRepository *repository.UserCartedProductRepository) *UserCartedProductService {
	return &UserCartedProductService{
		DB:                   db,
		Log:                  log,
		Validate:             validate,
		ProductRepository:    productRepository,
		UserRepository:       userRepository,
		UserCartedRepository: cartedProductRepository,
	}
}

func (service *UserCartedProductService) Carted(claims jwt.MapClaims, req *model.CartedProduct) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	user := new(entity.User)
	err = service.UserRepository.TakeById(service.DB, user, claims["sub"].(string))
	if err != nil {
		return err
	}

	product := new(entity.Product)
	err = service.ProductRepository.TakeById(service.DB, product, req.ProductID)
	if err != nil {
		return err
	}

	userCartedProduct := &entity.UserCartedProduct{
		UserID:    user.ID,
		ProductID: product.ID,
	}

	if count := service.UserCartedRepository.CountWithUserAndProduct(service.DB, userCartedProduct); count == 0 {
		userCartedProduct.Qty = req.Qty
		err = service.UserCartedRepository.Create(service.DB, userCartedProduct)
		return err
	} else {
		err := service.UserCartedRepository.Take(service.DB, userCartedProduct)
		if err != nil {
			return err
		}
		atoi, _ := strconv.Atoi(product.Qty)
		if (userCartedProduct.Qty + req.Qty) > atoi {
			return errors.New("quantity exceeds limit")
		}
		userCartedProduct.Qty += req.Qty
		err = service.UserCartedRepository.Save(service.DB, userCartedProduct)
		return err
	}

	return nil

}
