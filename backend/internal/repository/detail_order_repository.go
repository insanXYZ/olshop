package repository

import (
	"backend/internal/entity"
	"github.com/sirupsen/logrus"
)

type DetailOrderRepository struct {
	Repository[entity.DetailOrder]
	Log *logrus.Logger
}

func NewDetailOrderRepository(log *logrus.Logger) *DetailOrderRepository {
	return &DetailOrderRepository{
		Log: log,
	}
}
