package entity

import "time"

type Order struct {
	ID           string         `gorm:"primary_key;column:id"`
	UserID       string         `gorm:"column:user_id"`
	Total        int            `gorm:"column:total"`
	CreatedAt    time.Time      `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt    time.Time      `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	DetailOrders []*DetailOrder `gorm:"foreignKey:order_id;references:id"`
}

func (receiver *Order) TableName() string {
	return "orders"
}
