package model

import (
	"backend/internal/entity"
	"time"
)

type ProductResponse struct {
	ID            string                `json:"id"`
	Name          string                `json:"name"`
	Price         string                `json:"price"`
	Qty           string                `json:"qty"`
	Description   string                `json:"description"`
	CreatedAt     time.Time             `json:"created_at"`
	Category      *entity.Category      `json:"category,omitempty"`
	ImageProducts []entity.ImageProduct `json:"images,omitempty"`
	LikedByUsers  []entity.User         `json:"liked_by_users,omitempty"`
	Liked         bool                  `json:"liked,omitempty"`
	LikedCount    int                   `json:"liked_count,omitempty"`
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
