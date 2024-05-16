package model

import "time"

type UserCartedProductResponse struct {
	ID        int              `json:"id,omitempty"`
	Qty       int              `json:"qty,omitempty"`
	CreatedAt time.Time        `json:"created_at,omitempty"`
	User      *UserResponse    `json:"user,omitempty"`
	Product   *ProductResponse `json:"product,omitempty"`
}
