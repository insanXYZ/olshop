package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func DetailOrderToResponse(entity *entity.DetailOrder) *model.DetailOrderResponse {

	if entity == nil {
		return nil
	}

	return &model.DetailOrderResponse{
		ID:        entity.ID,
		Qty:       entity.Qty,
		Total:     entity.Qty,
		CreatedAt: entity.CreatedAt,
		Order:     OrderToResponse(entity.Order),
		Product:   ProductToResponse(entity.Product),
	}
}
