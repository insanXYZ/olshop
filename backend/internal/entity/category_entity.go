package entity

import (
	"gorm.io/gorm"
	"time"
)

type Category struct {
	ID        string         `json:"id" gorm:"primary_key;column:id"`
	Name      string         `json:"name" gorm:"primaryKey;column:name"`
	CreatedAt time.Time      `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt time.Time      `json:"-" gorm:"column:updated_at;autoCreateTime;autoUpdateTime"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Product   []*Product     `json:"products,omitempty" gorm:"foreignKey:category_id;references:id"`
	Image     *ImageCategory `gorm:"foreignKey:category_id;references:id"`
}

func (c *Category) TableName() string {
	return "categories"
}
