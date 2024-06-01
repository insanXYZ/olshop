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

func (repo *OrderRepository) TakeByFilterDate(db *gorm.DB, order *entity.Order, date string) error {
	err := db.Preload("DetailOrders.Product", func(d *gorm.DB) *gorm.DB {
		return d.Unscoped()
	}).Where("date(created_at) = ?", date).Take(order).Error
	return err
}

func (repo *OrderRepository) FindByFilterDate(db *gorm.DB, order *[]entity.Order, from string, to string) error {
	err := db.Preload("DetailOrders.Product", func(d *gorm.DB) *gorm.DB {
		return d.Unscoped()
	}).Where("date(created_at) between ? and ?", from, to).Find(order).Error
	return err
}
