package repository

import (
	"backend/internal/entity"
	"backend/internal/model"
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

func (repo *ProductRepository) GetAllWithManyRelations(products *[]entity.Product, db *gorm.DB, filter *model.FilterQueryParamProduct) error {
	query := db.Preload("ImageProducts").Preload("LikedByUsers")

	if filter.Category != "" {
		query.Joins("JOIN categories ON categories.id = products.category_id", func(db *gorm.DB) *gorm.DB {
			return db.Unscoped()
		}).
			Where("categories.name = ?", filter.Category)
	}

	if filter.Keyword != "" {
		query.Where("products.name LIKE ?", "%"+filter.Keyword+"%")
	}

	return query.Preload("Category", func(db *gorm.DB) *gorm.DB {
		return db.Unscoped()
	}).Find(products).Error
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

func (repo *ProductRepository) TakeProductPopularWithDate(db *gorm.DB, date string) (*entity.Product, error) {
	product := new(entity.Product)

	err := db.Raw("select * from products where id in (select product_id from detail_orders where date(created_at) = ? order by sum(qty) desc) limit 1", date).Take(product).Error

	return product, err
}

func (repo *ProductRepository) TakeProductPopularWithBetween(db *gorm.DB, from, to string) (*entity.Product, error) {
	product := new(entity.Product)

	err := db.Raw("select * from products where id in (select product_id from detail_orders where date(created_at) between ? and ? order by sum(qty) desc) limit 1", from, to).Take(product).Error

	return product, err
}
