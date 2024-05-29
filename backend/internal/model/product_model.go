package model

import (
	"time"
)

type ProductResponse struct {
	ID            string                       `json:"id,omitempty"`
	Name          string                       `json:"name,omitempty"`
	Price         int                          `json:"price,omitempty"`
	Qty           int                          `json:"qty,omitempty"`
	Description   string                       `json:"description,omitempty"`
	CreatedAt     time.Time                    `json:"created_at,omitempty"`
	Category      *CategoryResponse            `json:"category,omitempty"`
	ImageProducts []*ImageProductResponse      `json:"images,omitempty"`
	LikedByUsers  []*UserResponse              `json:"liked_by_users,omitempty"`
	Liked         bool                         `json:"liked,omitempty"`
	LikedCount    int                          `json:"liked_count,omitempty"`
	CartedByUsers []*UserCartedProductResponse `json:"carted_by_users,omitempty"`
	Order         int                          `json:"order,omitempty"`
}

type GetDetailsProduct struct {
	ID string `param:"id" json:"id"`
}

type DeleteProduct struct {
	ID string `param:"id" json:"id"`
}

type LikedProduct struct {
	ID string `json:"product_id" form:"product_id" validate:"required"`
}

type CreateProduct struct {
	Name        string `json:"name" form:"name" validate:"required,min=3"`
	Price       int    `json:"price" form:"price" validate:"required"`
	Qty         int    `json:"qty" form:"qty" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
	CategoryID  string `json:"category_id" form:"category_id" validate:"required"`
}

type UpdateProduct struct {
	ID          string `param:"id" validate:"required"`
	Name        string `json:"name" form:"name" validate:"omitempty,min=3"`
	Price       int    `json:"price" form:"price" `
	Qty         int    `json:"qty" form:"qty" `
	Description string `json:"description" form:"description" `
	CategoryID  string `json:"category_id" form:"category_id" `
}

type CartedProduct struct {
	ProductID string `json:"product_id" form:"product_id" validate:"required"`
	Qty       int    `json:"qty" form:"qty" validate:"required"`
}

type FilterQueryParamProduct struct {
	Category string `query:"category"`
	Keyword  string `query:"keyword"`
}
