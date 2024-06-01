package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type OrderRepository struct {
	Repository[entity.Order]
	Log *logrus.Logger
}

func NewOrderRepository(log *logrus.Logger) *OrderRepository {
	return &OrderRepository{
		Log: log,
	}
}

func (repo *OrderRepository) TakeWithGetRelationDetailOrder(db *gorm.DB, order *entity.Order) error {
	err := db.Preload("DetailOrders").Take(order).Error
	return err
}

func (repo *OrderRepository) FindWithWhereDate(db *gorm.DB, model *[]entity.Order, date string) error {
	err := db.Where("date(created_at) = ?", date).Find(model).Error
	return err
}

func (repo *OrderRepository) FindWithWhereBetweenDate(db *gorm.DB, model *[]entity.Order, from, to string) error {
	err := db.Where("date(created_at) between ? and ?", from, to).Find(model).Error
	return err
}
