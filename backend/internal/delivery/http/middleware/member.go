package middleware

import (
	"backend/internal/utils/httpresponse"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
)

func (config *MiddlewareConfig) Member(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		claims := c.Get("user").(jwt.MapClaims)
		if claims["role"].(string) == "member" {
			return next(c)
		}
		return httpresponse.Error(c, "forbidden", http.StatusForbidden)
	}
}
