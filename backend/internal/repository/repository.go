package repository

import "gorm.io/gorm"

type Repository[T any] struct {
}

func (r *Repository[T]) Create(db *gorm.DB, entity *T) error {
	return db.Create(entity).Error
}

func (r *Repository[T]) Save(db *gorm.DB, entity *T) error {
	return db.Save(entity).Error
}

func (r *Repository[T]) Delete(db *gorm.DB, entity *T) error {
	return db.Delete(entity).Error
}

func (r *Repository[T]) Take(db *gorm.DB, entity *T) error {
	return db.Model(new(T)).Where(entity).Take(entity).Error
}

func (r *Repository[T]) CountByWhere(db *gorm.DB, where *T) (int64, error) {
	var total int64
	err := db.Model(new(T)).Where(where).Count(&total).Error
	return total, err
}

func (r *Repository[T]) TakeById(db *gorm.DB, entity *T, id any) error {
	return db.Where("id = ?", id).Take(entity).Error
}

func (r *Repository[T]) FindAll(db *gorm.DB) ([]T, error) {
	var model []T
	err := db.Find(&model).Error
	return model, err
}

func (r *Repository[T]) Update(db *gorm.DB, model *T, data *T) error {
	return db.Model(model).Updates(data).Error
}
