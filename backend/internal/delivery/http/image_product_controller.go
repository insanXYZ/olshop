package http

import (
	"backend/internal/service"
	"github.com/sirupsen/logrus"
)

type ImageProductController struct {
	Log                 *logrus.Logger
	ImageProductService *service.ImageProductService
}

func NewImageProductController(authService *service.ImageProductService, logger *logrus.Logger) *ImageProductController {
	return &ImageProductController{
		Log:                 logger,
		ImageProductService: authService,
	}
}
