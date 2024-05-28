package http

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/internal/utils/httpresponse"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type CategoryController struct {
	Log             *logrus.Logger
	CategoryService *service.CategoryService
}

func NewCategoryController(authService *service.CategoryService, logger *logrus.Logger) *CategoryController {
	return &CategoryController{
		Log:             logger,
		CategoryService: authService,
	}
}

func (controller *CategoryController) GetAll(c echo.Context) error {
	categories, err := controller.CategoryService.GetAll()
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success get all categories", categories)
}

func (controller *CategoryController) Create(c echo.Context) error {
	req := new(model.CreateCategory)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	file, err := c.FormFile("image")
	if err != nil {
		return err
	}

	err = controller.CategoryService.Create(req, file)
	if err != nil {
		return err
	}

	return c.JSON(200, model.WebResponse{
		Message: "success create category",
	})

}

func (controller *CategoryController) Delete(c echo.Context) error {
	req := new(model.DeleteCategory)
	err := c.Bind(req)
	if err != nil {
		return err
	}
	err = controller.CategoryService.Delete(req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success delete category", nil)
}

func (controller *CategoryController) Update(c echo.Context) error {
	req := new(model.UpdateCategory)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}
	file, _ := c.FormFile("image")

	err = controller.CategoryService.Update(req, file)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success update category", nil)

}
