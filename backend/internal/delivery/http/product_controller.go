package http

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/internal/utils/httpresponse"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type ProductController struct {
	Log            *logrus.Logger
	ProductService *service.ProductService
}

func NewProductController(authService *service.ProductService, logger *logrus.Logger) *ProductController {
	return &ProductController{
		Log:            logger,
		ProductService: authService,
	}
}

func (controller *ProductController) GetAll(c echo.Context) error {
	req := new(model.FilterQueryParamProduct)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	products, err := controller.ProductService.GetAll(req)
	if err != nil {
		return err
	}
	return httpresponse.Success(c, "success get all products", products)
}

func (controller *ProductController) Create(c echo.Context) error {
	req := new(model.CreateProduct)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	images, err := c.MultipartForm()
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	form := images.File["images[]"]
	if len(form) == 0 {
		return httpresponse.Error(c, "images not found")
	}

	err = controller.ProductService.Create(req, form)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success create product", nil)

}

func (controller *ProductController) GetDetails(c echo.Context) error {
	claims := c.Get("user")
	req := new(model.GetDetailsProduct)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	details, err := controller.ProductService.GetDetails(claims, req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success get details product", details)

}

func (controller *ProductController) Delete(c echo.Context) error {
	req := new(model.DeleteProduct)
	err := c.Bind(req)
	if err != nil {
		return err
	}
	err = controller.ProductService.Delete(req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success delete product", nil)

}

func (controller *ProductController) Liked(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.LikedProduct)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	message, err := controller.ProductService.Liked(claims, req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, message, nil)
}

func (controller *ProductController) Update(c echo.Context) error {
	req := new(model.UpdateProduct)
	err := c.Bind(req)
	if err != nil {
		return err
	}
	images, err := c.MultipartForm()
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	form := images.File["images[]"]

	if err = controller.ProductService.Update(req, form); err != nil {
		return httpresponse.Error(c, err.Error())
	}
	return httpresponse.Success(c, "success update product", nil)
}
