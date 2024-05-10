package entity

import (
	"time"
)

type User struct {
	ID           string    `json:"id" gorm:"column:id;primaryKey"`
	Role         string    `json:"role" gorm:"column:role"`
	Name         string    `json:"name" gorm:"column:name"`
	Image        string    `json:"image" gorm:"column:image"`
	Email        string    `json:"email" gorm:"column:email"`
	Password     string    `json:"password" gorm:"column:password"`
	CreatedAt    time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt    time.Time `json:"-" gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	LikeProducts []Product `json:"like_products,omitempty" gorm:"many2many:user_like_product;foreignKey:id;joinForeignKey:user_id;references:id;joinReferences:product_id"`
}

func (u *User) TableName() string {
	return "users"
}
