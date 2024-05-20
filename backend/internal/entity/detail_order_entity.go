package entity

import "time"

type DetailOrder struct {
	ID        string    `gorm:"primary_key;column:id"`
	ProductId string    `gorm:"column:product_id"`
	OrderId   string    `gorm:"column:order_id"`
	Qty       int       `gorm:"column:qty"`
	Total     int       `gorm:"column:total"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	Order     *Order    `gorm:"foreignKey:order_id;references:id"`
	Product   *Product  `gorm:"foreignKey:product_id;references:id"`
}

func (receiver *DetailOrder) TableName() string {
	return "detail_orders"
}
