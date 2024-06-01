package http

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/internal/utils/httpresponse"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type OrderController struct {
	Log          *logrus.Logger
	OrderService *service.OrderService
}

func NewOrderController(log *logrus.Logger, productService *service.OrderService) *OrderController {
	return &OrderController{Log: log, OrderService: productService}
}

func (controller *OrderController) Create(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.CreateOrder)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}
	res, err := controller.OrderService.Create(claims, req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}
	return httpresponse.Success(c, "success create order", res)
}

func (controller *OrderController) AfterPayment(c echo.Context) error {
	req := new(model.AfterPayment)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	err = controller.OrderService.AfterPayment(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success pay for the order", nil)
}

func (controller *OrderController) Report(c echo.Context) error {
	req := new(model.ReportOrder)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	report, err := controller.OrderService.Report(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}
	return httpresponse.Success(c, "success get report order", report)

}
