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

func (repo *CategoryRepository) TakeByName(db *gorm.DB, category *entity.Category, name string) (err error) {
	err = db.Take(category, "name = ?", name).Error
	return
}
