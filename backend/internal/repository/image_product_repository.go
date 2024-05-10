package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
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
