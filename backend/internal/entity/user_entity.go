package entity

import (
	"time"
)

type User struct {
	ID            string               `gorm:"column:id;primaryKey"`
	Role          string               `gorm:"column:role"`
	Name          string               `gorm:"column:name"`
	Image         string               `gorm:"column:image"`
	Email         string               `gorm:"column:email"`
	Password      string               `gorm:"column:password"`
	CreatedAt     time.Time            `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt     time.Time            `gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	CartedProduct []*UserCartedProduct `gorm:"foreignKey:user_id;references:id"`
	LikeProducts  []*Product           `gorm:"many2many:user_like_products;foreignKey:id;joinForeignKey:user_id;references:id;joinReferences:product_id"`
	OrderProducts []*Order             `gorm:"foreignKey:user_id;references:id"`
}

func (u *User) TableName() string {
	return "users"
}
