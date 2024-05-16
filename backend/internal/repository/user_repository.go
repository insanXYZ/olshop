package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type UserRepository struct {
	Repository[entity.User]
	Log *logrus.Logger
}

func NewUserRepository(log *logrus.Logger) *UserRepository {
	return &UserRepository{
		Log: log,
	}
}

func (repo *UserRepository) TakeByEmail(db *gorm.DB, user *entity.User, email string) (err error) {
	err = db.Take(&user, "email = ?", email).Error
	return
}

func (repo *UserRepository) CountByEmail(db *gorm.DB, user *entity.User, email string) int {
	var count int64
	db.Model(user).Where("email = ?", email).Count(&count)
	return int(count)
}

func (repo *UserRepository) FindAssociationLikeProduct(db *gorm.DB, user *entity.User, products *[]*entity.Product) error {
	err := db.Model(user).Preload("ImageProducts").Association("LikeProducts").Find(products)
	return err
}

func (repo *UserRepository) TakePreloadCartedProduct(db *gorm.DB, user *entity.User) error {
	err := db.Preload("CartedProduct.Product.ImageProducts").Take(user).Error
	return err
}
