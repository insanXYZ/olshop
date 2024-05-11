package http

import (
	"backend/internal/model"
	"backend/internal/model/converter"
	"backend/internal/service"
	"backend/internal/utils/httpresponse"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"net/http"
)

type UserController struct {
	Log         *logrus.Logger
	UserService *service.UserService
}

func NewUserController(authService *service.UserService, logger *logrus.Logger) *UserController {
	return &UserController{
		Log:         logger,
		UserService: authService,
	}
}

func (controller *UserController) Login(c echo.Context) error {
	req := new(model.LoginRequest)
	err := c.Bind(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	token, err := controller.UserService.Login(req)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = token
	cookie.Path = "/"

	c.SetCookie(cookie)

	return c.JSON(200, model.WebResponse{
		Data:    converter.UserToResponseToken(token),
		Message: "success login",
	})
}

func (controller *UserController) Register(c echo.Context) error {
	req := new(model.SignUpRequest)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	err = controller.UserService.Register(req)
	if err != nil {
		return err
	}

	return c.JSON(200, model.WebResponse{
		Message: "success register",
	})

}

func (controller *UserController) Refresh(c echo.Context) error {
	user := c.Get("user").(jwt.MapClaims)

	token, err := controller.UserService.Refresh(user)
	if err != nil {
		return httpresponse.Error(c, err.Error())
	}

	return httpresponse.Success(c, "success refresh", converter.UserToResponseToken(token))
}

func (controller *UserController) Get(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	user, err := controller.UserService.GetUser(claims)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success get user", user)
}

func (controller *UserController) UpdateUser(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.UpdateUser)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	err = controller.UserService.UpdateUser(c, claims, req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success update user", nil)
}

func (controller *UserController) UpdatePassword(c echo.Context) error {
	claims := c.Get("user").(jwt.MapClaims)
	req := new(model.UpdatePassword)
	err := c.Bind(req)
	if err != nil {
		return err
	}

	err = controller.UserService.UpdatePassword(claims, req)
	if err != nil {
		return err
	}

	return httpresponse.Success(c, "success update password", nil)
}
