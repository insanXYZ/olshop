package entity

import (
	"time"
)

type Product struct {
	ID                  string               `gorm:"primary_key;column:id"`
	Name                string               `gorm:"column:name"`
	Price               string               `gorm:"column:price"`
	Qty                 string               `gorm:"column:qty"`
	CategoryID          string               `gorm:"column:category_id"`
	Description         string               `gorm:"column:description"`
	CreatedAt           time.Time            `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt           time.Time            `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	Category            *Category            `gorm:"foreignKey:category_id;references:id"`
	CartedProductByUser []*UserCartedProduct `gorm:"foreignKey:product_id;references:id"`
	ImageProducts       []*ImageProduct      `gorm:"foreignKey:product_id;references:id"`
	LikedByUsers        []*User              `gorm:"many2many:user_like_product;foreignKey:id;joinForeignKey:product_id;references:id;joinReferences:user_id"`
}

func (receiver *Product) TableName() string {
	return "products"
}
