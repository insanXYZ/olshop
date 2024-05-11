package model

import (
	"time"
)

type ProductResponse struct {
	ID            string                  `json:"id"`
	Name          string                  `json:"name"`
	Price         string                  `json:"price"`
	Qty           string                  `json:"qty"`
	Description   string                  `json:"description"`
	CreatedAt     time.Time               `json:"created_at"`
	Category      *CategoryResponse       `json:"category,omitempty"`
	ImageProducts []*ImageProductResponse `json:"images,omitempty"`
	LikedByUsers  []*UserResponse         `json:"liked_by_users,omitempty"`
	Liked         bool                    `json:"liked,omitempty"`
	LikedCount    int                     `json:"liked_count,omitempty"`
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
	Price       string `json:"price" form:"price" validate:"required"`
	Qty         string `json:"qty" form:"qty" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
	CategoryID  string `json:"category_id" form:"category_id" validate:"required"`
}

type CartedProduct struct {
	ProductID string `json:"product_id" form:"product_id" validate:"required"`
	Qty       string `json:"qty" form:"qty" validate:"required"`
}
