package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	Repository[entity.Category]
	Log *logrus.Logger
}

func NewCategoryRepository(log *logrus.Logger) *CategoryRepository {
	return &CategoryRepository{
		Log: log,
	}
}

func (repo *CategoryRepository) FindAllWithImageRelation(db *gorm.DB, model *[]entity.Category) error {
	err := db.Joins("Image").Find(model).Error
	return err
}

func (repo *CategoryRepository) TakeWithImageRelation(db *gorm.DB, model *entity.Category) error {
	return db.Joins("Image").Where(model).Take(model).Error
}
