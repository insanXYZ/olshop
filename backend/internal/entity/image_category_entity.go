package entity

import "time"

type ImageCategory struct {
	ID         string `gorm:"primary_key;column:id"`
	Name       string `gorm:"column:name"`
	CategoryID string `gorm:"column:category_id"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
	Category   *Category `gorm:"foreignKey:category_id;references:id"`
}

func (c *ImageCategory) TableName() string {
	return "image_categories"
}
