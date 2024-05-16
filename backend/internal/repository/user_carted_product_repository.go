package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type UserCartedProductRepository struct {
	Repository[entity.UserCartedProduct]
	Log *logrus.Logger
}

func NewUserCartedProductRepository(log *logrus.Logger) *UserCartedProductRepository {
	return &UserCartedProductRepository{
		Log: log,
	}
}

func (repo *UserCartedProductRepository) CountWithUserAndProduct(db *gorm.DB, product *entity.UserCartedProduct) int {
	var count int64
	db.Model(product).Count(&count)
	return int(count)
}
