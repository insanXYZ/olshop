package entity

import (
	"time"
)

type Product struct {
	ID            string         `json:"id" gorm:"primary_key;column:id"`
	Name          string         `json:"name" gorm:"column:name"`
	Price         string         `json:"price" gorm:"column:price"`
	Qty           string         `json:"qty" gorm:"column:qty"`
	CategoryID    string         `json:"-" gorm:"column:category_id"`
	Description   string         `json:"description" gorm:"column:description"`
	CreatedAt     time.Time      `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt     time.Time      `json:"-" gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	Category      *Category      `json:"category,omitempty" gorm:"foreignKey:category_id;references:id"`
	ImageProducts []ImageProduct `json:"images,omitempty" gorm:"foreignKey:product_id;references:id"`
	LikedByUsers  []User         `json:"liked_by_users,omitempty" gorm:"many2many:user_like_product;foreignKey:id;joinForeignKey:product_id;references:id;joinReferences:user_id"`
}

func (receiver *Product) TableName() string {
	return "products"
}
