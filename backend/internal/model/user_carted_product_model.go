package model

import "time"

type UserCartedProductResponse struct {
	ID        int              `json:"id,omitempty"`
	Qty       int              `json:"qty,omitempty"`
	CreatedAt time.Time        `json:"created_at,omitempty"`
	User      *UserResponse    `json:"user,omitempty"`
	Product   *ProductResponse `json:"product,omitempty"`
}

type UpdateCart struct {
	ID  int `param:"id" validate:"required"`
	Qty int `json:"qty" form:"qty" validate:"required"`
}

type DeleteCarts struct {
	CartsID []int `json:"carts_id" form:"carts_id" validate:"required"`
}
