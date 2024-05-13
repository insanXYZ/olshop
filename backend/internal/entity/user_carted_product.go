package entity

import "time"

type UserCartedProduct struct {
	ID        int       `gorm:"primary_key;column:id"`
	Qty       int       `gorm:"column:qty"`
	UserID    string    `gorm:"column:user_id"`
	ProductID string    `gorm:"column:product_id"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	User      *User     `gorm:"foreignKey:user_id;references:id"`
	Product   *Product  `gorm:"foreignKey:product_id;references:id"`
}

func (receiver *UserCartedProduct) TableName() string {
	return "user_carted_product"
}
