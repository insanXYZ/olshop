package entity

import "time"

type ImageProduct struct {
	ID        int       `json:"id" gorm:"primary_key;column:id"`
	Name      string    `json:"name" gorm:"column:name"`
	ProductID string    `json:"-" gorm:"column:product_id"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt time.Time `json:"-" gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	Product   *Product  `json:"product,omitempty" gorm:"foreignKey:product_id;references:id"`
}

func (c *ImageProduct) TableName() string {
	return "image_products"
}
