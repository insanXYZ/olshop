package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ProductRepository struct {
	Repository[entity.Product]
	Log *logrus.Logger
}

func NewProductRepository(log *logrus.Logger) *ProductRepository {
	return &ProductRepository{
		Log: log,
	}
}

func (repo *ProductRepository) GetAllWithManyRelations(products *[]entity.Product, db *gorm.DB) error {
	err := db.Preload("Category", func(db *gorm.DB) *gorm.DB {
		return db.Unscoped()
	}).Preload("ImageProducts").Preload("LikedByUsers").Find(products).Error
	return err
}

func (repo *ProductRepository) GetByIdWithManyRelations(products *entity.Product, id any, db *gorm.DB) error {
	err := db.Preload("Category").Preload("Ordered.Order", func(db *gorm.DB) *gorm.DB {
		return db.Where("status = ?", "paid")
	}).Preload("ImageProducts").Preload("LikedByUsers").Take(products, "id =?", id).Error
	return err
}

func (repo *ProductRepository) CountRelationLikedByUserWithUserId(db *gorm.DB, product *entity.Product, id any) int {
	count := db.Model(product).Where("users.id = ?", id).Association("LikedByUsers").Count()
	return int(count)
}

func (repo *ProductRepository) LikedProduct(db *gorm.DB, user *entity.User, product *entity.Product) error {
	err := db.Model(product).Association("LikedByUsers").Append(user)
	return err
}

func (repo *ProductRepository) UnlikedProduct(db *gorm.DB, user *entity.User, product *entity.Product) error {
	err := db.Model(product).Association("LikedByUsers").Delete(user)
	return err
}
