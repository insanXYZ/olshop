package httpresponse

import (
	"backend/internal/model"
	"github.com/labstack/echo/v4"
)

func Success(c echo.Context, message string, data any, status ...int) error {
	if len(status) == 0 {
		status = []int{200}
	}
	return c.JSON(status[0], &model.WebResponse{
		Data:    data,
		Message: message,
	})
}

func Error(c echo.Context, message string, status ...int) error {
	if len(status) == 0 {
		status = []int{400}
	}
	return c.JSON(status[0], &model.WebResponse{
		Message: message,
	})
}
