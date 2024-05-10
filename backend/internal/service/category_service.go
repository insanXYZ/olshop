package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/repository"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type CategoryService struct {
	DB                 *gorm.DB
	Log                *logrus.Logger
	Validate           *validator.Validate
	CategoryRepository *repository.CategoryRepository
}

func NewCategoryService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, repo *repository.CategoryRepository) *CategoryService {
	return &CategoryService{
		DB:                 db,
		Log:                log,
		Validate:           validate,
		CategoryRepository: repo,
	}
}

func (service *CategoryService) GetAll() ([]entity.Category, error) {
	categories, err := service.CategoryRepository.FindAll(service.DB)
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (service *CategoryService) Create(category *model.CreateCategory) error {
	err := service.Validate.Struct(category)
	if err != nil {
		return err
	}

	if err = service.CategoryRepository.TakeByName(service.DB, &entity.Category{}, category.Name); err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		err := service.CategoryRepository.Create(service.DB, &entity.Category{
			ID:   uuid.New().String(),
			Name: category.Name,
		})

		return err
	}

	return err
}

func (service *CategoryService) Delete(req *model.DeleteCategory) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	category := new(entity.Category)
	err = service.CategoryRepository.TakeById(service.DB, category, req.ID)
	if err != nil {
		return err
	}

	err = service.CategoryRepository.Delete(service.DB, category)
	if err != nil {
		return err
	}

	return nil
}
