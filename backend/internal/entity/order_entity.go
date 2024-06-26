package entity

import "time"

type Order struct {
	ID           string         `gorm:"primary_key;column:id"`
	UserID       string         `gorm:"column:user_id"`
	Total        int            `gorm:"column:total"`
	Profit       int            `gorm:"column:profit"`
	Status       string         `gorm:"column:status"`
	CreatedAt    time.Time      `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt    time.Time      `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	DetailOrders []*DetailOrder `gorm:"foreignKey:order_id;references:id"`
	User         *User          `gorm:"foreignKey:user_id;references:id"`
}

func (receiver *Order) TableName() string {
	return "orders"
}
