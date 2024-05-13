package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
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
