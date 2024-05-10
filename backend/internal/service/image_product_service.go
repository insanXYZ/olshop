package service

import (
	"backend/internal/repository"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ImageProductService struct {
	DB                     *gorm.DB
	Log                    *logrus.Logger
	Validate               *validator.Validate
	ImageProductRepository *repository.ImageProductRepository
}

func NewImageProductService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, repo *repository.ImageProductRepository) *ImageProductService {
	return &ImageProductService{
		DB:                     db,
		Log:                    log,
		Validate:               validate,
		ImageProductRepository: repo,
	}
}
