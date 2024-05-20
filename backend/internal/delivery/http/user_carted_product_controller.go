package http

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/internal/utils/httpresponse"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type UserCartedProductController struct {
	Log                      *logrus.Logger
	UserCartedProductService *service.UserCartedProductService
}

func NewUserCartedProductController(authService *service.UserCartedProductService, logger *logrus.Logger) *UserCartedProductController {
	return &UserCartedProductController{
		Log:                      logger,
		UserCartedProductService: authService,
	}
}

func (controller *UserCartedProductController) Carted(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.CartedProduct)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	err = controller.UserCartedProductService.Carted(claims, req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success insert product to cart", nil)

}

func (controller *UserCartedProductController) Update(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.UpdateCart)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}
	err = controller.UserCartedProductService.Update(claims, req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success update product to cart", nil)
}
