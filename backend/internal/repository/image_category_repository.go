package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
)

type ImageCategoryRepository struct {
	Repository[entity.ImageCategory]
	Log *logrus.Logger
}

func NewImageCategoryRepository(log *logrus.Logger) *ImageCategoryRepository {
	return &ImageCategoryRepository{Log: log}
}
