package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ImageProductRepository struct {
	Repository[entity.ImageProduct]
	Log *logrus.Logger
}

func NewImageProductRepository(log *logrus.Logger) *ImageProductRepository {
	return &ImageProductRepository{
		Log: log,
	}
}

func (repo ImageProductRepository) DeleteByProductId(db *gorm.DB, productId string) error {
	err := db.Where("product_id = ?", productId).Delete(&entity.ImageProduct{}).Error
	return err
}
