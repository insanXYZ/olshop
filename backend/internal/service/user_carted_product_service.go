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

	count, err := service.UserCartedRepository.CountByWhere(service.DB, userCartedProduct)
	if err != nil {
		return err
	}

	if count == 0 {
		userCartedProduct.Qty = req.Qty
		err = service.UserCartedRepository.Create(service.DB, userCartedProduct)
		return err
	}

	err = service.UserCartedRepository.Take(service.DB, userCartedProduct)
	if err != nil {
		return err
	}
	if (userCartedProduct.Qty + req.Qty) > product.Qty {
		return errors.New("quantity exceeds limit")
	}
	userCartedProduct.Qty += req.Qty
	err = service.UserCartedRepository.Save(service.DB, userCartedProduct)
	return err

}

func (service *UserCartedProductService) Update(claims jwt.MapClaims, req *model.UpdateCart) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}
	ent := &entity.UserCartedProduct{
		ID:     req.ID,
		UserID: claims["sub"].(string),
	}
	err = service.UserCartedRepository.Take(service.DB, ent)
	if err != nil {
		return err
	}

	ent.Qty = req.Qty
	err = service.UserCartedRepository.Save(service.DB, ent)
	if err != nil {
		return err
	}
	return nil
}
