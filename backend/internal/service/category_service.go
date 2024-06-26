package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/model/converter"
	"backend/internal/repository"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/insanXYZ/sage"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"io"
	"mime/multipart"
	"os"
	"strings"
)

type CategoryService struct {
	DB                      *gorm.DB
	Log                     *logrus.Logger
	Validate                *validator.Validate
	CategoryRepository      *repository.CategoryRepository
	ImageCategoryRepository *repository.ImageCategoryRepository
}

func NewCategoryService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, repo *repository.CategoryRepository, imageCategoryRepo *repository.ImageCategoryRepository) *CategoryService {
	return &CategoryService{
		DB:                      db,
		Log:                     log,
		Validate:                validate,
		CategoryRepository:      repo,
		ImageCategoryRepository: imageCategoryRepo,
	}
}

func (service *CategoryService) GetAll() ([]*model.CategoryResponse, error) {
	var categories []entity.Category
	err := service.CategoryRepository.FindAllWithImageRelation(service.DB, &categories)
	if err != nil {
		return nil, err
	}

	res := make([]*model.CategoryResponse, len(categories))
	for i, category := range categories {
		res[i] = converter.CategoryToResponse(&category)
	}

	return res, nil
}

func (service *CategoryService) Create(req *model.CreateCategory, image *multipart.FileHeader) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}
	err = sage.Validate(image)
	if err != nil {
		return err
	}

	category := &entity.Category{Name: req.Name}

	err = service.DB.Transaction(func(tx *gorm.DB) error {

		if err = service.CategoryRepository.Take(tx, category); err != nil && errors.Is(err, gorm.ErrRecordNotFound) {

			category.ID = uuid.New().String()

			err := service.CategoryRepository.Create(service.DB, category)

			filename := uuid.New().String() + "-" + category.Name + "." + strings.Split(image.Filename, ".")[len(strings.Split(image.Filename, "."))-1]

			err = service.ImageCategoryRepository.Create(tx, &entity.ImageCategory{
				ID:         uuid.New().String(),
				Name:       filename,
				CategoryID: category.ID,
			})

			if err != nil {
				return err
			}

			open, err := image.Open()
			if err != nil {
				return err
			}

			if err != nil {
				return err
			}

			dsn, err := os.Create("storage/app/category/" + filename)
			if err != nil {
				return err
			}

			_, err = io.Copy(dsn, open)
			return err
		}

		return errors.New("category already exists")
	})

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

func (service *CategoryService) Update(req *model.UpdateCategory, file *multipart.FileHeader) error {

	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	err = service.DB.Transaction(func(tx *gorm.DB) error {

		category := &entity.Category{
			ID: req.ID,
		}

		err := service.CategoryRepository.TakeWithImageRelation(tx, category)
		if err != nil {
			return err
		}

		if req.Name != "" {
			err := service.CategoryRepository.Update(tx, category, &entity.Category{Name: req.Name})
			if err != nil {
				return err
			}
		}

		if file != nil {

			filename := uuid.New().String() + "-" + category.Name + "." + strings.Split(file.Filename, ".")[len(strings.Split(file.Filename, "."))-1]

			open, err := file.Open()
			if err != nil {
				return err
			}

			dsn, err := os.Create("storage/app/category/" + filename)
			if err != nil {
				return err
			}

			_, err = io.Copy(dsn, open)
			if err != nil {
				return err
			}

			err = os.Remove("storage/app/category/" + category.Image.Name)
			if err != nil {
				return err
			}

			err = service.ImageCategoryRepository.Update(tx, category.Image, &entity.ImageCategory{
				Name: filename,
			})

			if err != nil {
				return err
			}

		}

		return nil
	})

	return err

}
