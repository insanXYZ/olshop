package model

import (
	"backend/internal/entity"
)

type UserResponse struct {
	ID           string           `json:"id,omitempty"`
	Role         string           `json:"role,omitempty"`
	Name         string           `json:"name,omitempty"`
	Image        string           `json:"image,omitempty"`
	Email        string           `json:"email,omitempty"`
	Token        string           `json:"token,omitempty"`
	CreatedAt    any              `json:"created_at,omitempty"`
	LikeProducts []entity.Product `json:"like_products,omitempty"`
}

type LoginRequest struct {
	Email    string `json:"email" form:"email" validate:"required" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required" validate:"required,min=8"`
}

type SignUpRequest struct {
	Name     string `json:"name" form:"name" validate:"required" validate:"required,min=4"`
	Email    string `json:"email" form:"email" validate:"required" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required" validate:"required,min=8"`
}

type UpdateUser struct {
	Name  string `json:"name" form:"name" validate:"omitempty,min=4"`
	Email string `json:"email" form:"email" validate:"omitempty,email"`
}

type UpdatePassword struct {
	OldPassword string `json:"old_password" form:"old_password" validate:"required,min=8"`
	NewPassword string `json:"new_password" form:"new_password" validate:"required,min=8"`
}
