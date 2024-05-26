package entity

import (
	"gorm.io/gorm"
	"time"
)

type Product struct {
	ID                  string               `gorm:"primary_key;column:id"`
	Name                string               `gorm:"column:name"`
	Price               int                  `gorm:"column:price"`
	Qty                 int                  `gorm:"column:qty"`
	CategoryID          string               `gorm:"column:category_id"`
	Description         string               `gorm:"column:description"`
	CreatedAt           time.Time            `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt           time.Time            `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	DeletedAt           gorm.DeletedAt       `gorm:"index"`
	Category            *Category            `gorm:"foreignKey:category_id;references:id"`
	CartedProductByUser []*UserCartedProduct `gorm:"foreignKey:product_id;references:id"`
	ImageProducts       []*ImageProduct      `gorm:"foreignKey:product_id;references:id"`
	LikedByUsers        []*User              `gorm:"many2many:user_like_products;foreignKey:id;joinForeignKey:product_id;references:id;joinReferences:user_id"`
	Ordered             []*DetailOrder       `gorm:"foreignKey:product_id;references:id"`
}

func (receiver *Product) TableName() string {
	return "products"
}
