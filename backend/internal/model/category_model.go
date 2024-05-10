package model

import (
	"backend/internal/entity"
	"time"
)

type CategoryResponse struct {
	ID        string           `json:"id" `
	Name      string           `json:"name" `
	CreatedAt time.Time        `json:"created_at" `
	Product   []entity.Product `json:"products,omitempty" `
}

type CreateCategory struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type DeleteCategory struct {
	ID string `param:"id" validate:"required"`
}
