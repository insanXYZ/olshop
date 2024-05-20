package model

import "time"

type DetailOrderResponse struct {
	ID        string           `json:"id,omitempty"`
	Qty       int              `json:"qty,omitempty"`
	Total     int              `json:"total,omitempty"`
	CreatedAt time.Time        `json:"created_at,omitempty"`
	Order     *OrderResponse   `json:"order,omitempty"`
	Product   *ProductResponse `json:"product,omitempty"`
}

type CreateDetailOrder struct {
	ProductID string `json:"product_id" validate:"required"`
	Qty       int    `json:"qty" validate:"required"`
}
