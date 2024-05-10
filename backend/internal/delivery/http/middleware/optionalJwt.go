package middleware

import (
	"backend/internal/utils/httpresponse"
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"strings"
	"time"
)

func (config *MiddlewareConfig) Optional(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if header := c.Request().Header.Get("Authorization"); header != "" {
			if tokenParts := strings.Split(header, " "); len(tokenParts) == 2 && tokenParts[0] == "Bearer" {
				token := tokenParts[1]
				claims := jwt.MapClaims{}
				_, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
					if token.Method != jwt.SigningMethodHS256 {
						return nil, errors.New("wrong signing method")
					}

					return []byte(config.viper.GetString("SECRET_KEY")), nil
				})

				if err != nil {
					if int64(claims["exp"].(float64)) <= time.Now().Unix() {
						return httpresponse.Error(c, err.Error(), 401)
					}
					return httpresponse.Error(c, err.Error(), 400)
				}

				c.Set("user", jwt.MapClaims{
					"sub":  claims["sub"],
					"name": claims["name"],
				})

				return next(c)
			}
		}
		return next(c)
	}
}
