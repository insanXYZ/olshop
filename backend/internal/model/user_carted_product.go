package model

import "time"

type UserCartedProductResponse struct {
	ID        int              `json:"id"`
	Qty       int              `json:"qty"`
	CreatedAt time.Time        `json:"created_at"`
	User      *UserResponse    `json:"user"`
	Product   *ProductResponse `json:"product"`
}
