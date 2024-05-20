package route

import (
	"backend/internal/delivery/http"
	"backend/internal/delivery/http/middleware"
	"github.com/labstack/echo/v4"
)

type RouteConfig struct {
	App                         *echo.Echo
	UserController              *http.UserController
	ProductController           *http.ProductController
	CategoryController          *http.CategoryController
	ImageProductController      *http.ImageProductController
	UserCartedProductController *http.UserCartedProductController
	OrderController             *http.OrderController
	Middleware                  *middleware.MiddlewareConfig
}

func (c *RouteConfig) Setup() {
	c.App.Static("/storage", "storage/app")
	api := c.App.Group("/api")
	c.SetupGuestRoute(api)
	c.SetupAuthRoute(api)
}

func (c *RouteConfig) SetupGuestRoute(api *echo.Group) {
	api.POST("/register", c.UserController.Register)
	api.POST("/login", c.UserController.Login)
	api.GET("/categories", c.CategoryController.GetAll)
	api.GET("/products", c.ProductController.GetAll)
	api.GET("/products/:id", c.ProductController.GetDetails, c.Middleware.Optional)
}

func (c *RouteConfig) SetupAuthRoute(api *echo.Group) {

	api.GET("/refresh", c.UserController.Refresh, c.Middleware.Refresh)

	api.Use(c.Middleware.Jwt())
	api.GET("/users", c.UserController.Get)
	api.GET("/users/products/like", c.UserController.GetLikedProduct, c.Middleware.Member)
	api.GET("/users/products/carts", c.UserController.GetCartedProduct, c.Middleware.Member)
	api.PATCH("/users", c.UserController.UpdateUser)
	api.PATCH("/users/password", c.UserController.UpdatePassword)
	api.POST("/categories", c.CategoryController.Create, c.Middleware.Admin)
	api.DELETE("/categories/:id", c.CategoryController.Delete, c.Middleware.Admin)
	api.POST("/products", c.ProductController.Create, c.Middleware.Admin)
	api.DELETE("/products/:id", c.ProductController.Delete, c.Middleware.Admin)
	api.POST("/products/like", c.ProductController.Liked, c.Middleware.Member)
	api.POST("/carts", c.UserCartedProductController.Carted, c.Middleware.Member)
	api.PATCH("/carts/:id", c.UserCartedProductController.Update, c.Middleware.Member)
	api.POST("/orders", c.OrderController.Create, c.Middleware.Member)
}
