package model

import (
	"time"
)

type OrderResponse struct {
	ID           string                 `json:"id,omitempty"`
	UserID       string                 `json:"user_id,omitempty"`
	Total        int                    `json:"total,omitempty"`
	Profit       int                    `json:"profit,omitempty"`
	Status       string                 `json:"status,omitempty"`
	CreatedAt    time.Time              `json:"created_at,omitempty"`
	DetailOrders []*DetailOrderResponse `json:"detail_orders,omitempty"`
	User         *UserResponse          `json:"user,omitempty"`
}

type ReportOrderResponse struct {
	GrossProfit       int                   `json:"gross_profit"`        //keuntungan kotor
	NetProfit         int                   `json:"net_profit"`          //keuntungan bersih
	AmountProductSold int                   `json:"amount_product_sold"` //jumlah terjual
	OrdersGrouped     []OrdersReportGrouped `json:"orders_grouped"`
	Orders            []*OrderResponse      `json:"orders"`
	ProductPopular    ProductPopular        `json:"product_popular"`
}

type ProfitOrder struct {
	GrossProfit       int `json:"gross_profit"`        //keuntungan kotor
	NetProfit         int `json:"net_profit"`          //keuntungan bersih
	AmountProductSold int `json:"amount_product_sold"` //jumlah terjual

}

type OrdersReportGrouped struct {
	Date              string `json:"date"`
	GrossProfit       int    `json:"gross_profit"`
	NetProfit         int    `json:"net_profit"`
	AmountProductSold int    `json:"amount_product_sold"`
}

type CreateOrder struct {
	DetailOrders []*CreateDetailOrder `json:"detail_orders" validate:"required,dive"`
}

type AfterPayment struct {
	TransactionStatus string `json:"transaction_status" validate:"required"`
	SignatureKey      string `json:"signature_key" validate:"required"`
	OrderId           string `json:"order_id" validate:"required"`
	StatusCode        string `json:"status_code" validate:"required"`
	GrossAmount       string `json:"gross_amount" validate:"required"`
}

type ReportOrder struct {
	Filter    string `query:"filter"`
	StartFrom string `query:"from"`
	EndTo     string `query:"to"`
}
