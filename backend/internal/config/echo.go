package config

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewEcho() *echo.Echo {
	app := echo.New()
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowCredentials: true,
	}))
	return app
}
