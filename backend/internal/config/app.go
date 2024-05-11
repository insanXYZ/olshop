package config

import (
	"backend/internal/delivery/http"
	"backend/internal/delivery/http/middleware"
	"backend/internal/delivery/http/route"
	"backend/internal/repository"
	"backend/internal/service"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type BootstrapConfig struct {
	DB          *gorm.DB
	App         *echo.Echo
	Log         *logrus.Logger
	Validate    *validator.Validate
	ViperConfig *viper.Viper
}

func Bootstrap(config *BootstrapConfig) {

	//setup repositories
	userRepository := repository.NewUserRepository(config.Log)
	categoryRepository := repository.NewCategoryRepository(config.Log)
	imageProductRepository := repository.NewImageProductRepository(config.Log)
	productRepository := repository.NewProductRepository(config.Log)
	userCartedProductRepository := repository.NewUserCartedProductRepository(config.Log)

	//setup services
	userService := service.NewUserService(config.DB, config.Log, config.Validate, userRepository, config.ViperConfig)
	categoryService := service.NewCategoryService(config.DB, config.Log, config.Validate, categoryRepository)
	imageProductService := service.NewImageProductService(config.DB, config.Log, config.Validate, imageProductRepository)
	productService := service.NewProductService(config.DB, config.Log, config.Validate, productRepository, userRepository, imageProductRepository, userCartedProductRepository)

	//setup controller
	userController := http.NewUserController(userService, config.Log)
	categoryController := http.NewCategoryController(categoryService, config.Log)
	imageProductController := http.NewImageProductController(imageProductService, config.Log)
	productController := http.NewProductController(productService, config.Log)

	//setup middleware
	guard := middleware.NewMiddlewareConfig(config.ViperConfig)

	routeConfig := route.RouteConfig{
		App:                    config.App,
		UserController:         userController,
		ProductController:      productController,
		CategoryController:     categoryController,
		ImageProductController: imageProductController,
		Middleware:             guard,
	}

	routeConfig.Setup()
}
