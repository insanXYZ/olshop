package model

import (
	"time"
)

type CategoryResponse struct {
	ID        string             `json:"id" `
	Name      string             `json:"name" `
	CreatedAt time.Time          `json:"created_at" `
	Product   []*ProductResponse `json:"products,omitempty" `
	Image     *string            `json:"image,omitempty" `
}

type CreateCategory struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type DeleteCategory struct {
	ID string `param:"id" validate:"required"`
}

type UpdateCategory struct {
	ID   string `param:"id" validate:"required"`
	Name string `json:"name" form:"name"`
}
