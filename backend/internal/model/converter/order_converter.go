package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func OrderToResponse(entity *entity.Order) *model.OrderResponse {

	if entity == nil {
		return nil
	}

	detailOrders := make([]*model.DetailOrderResponse, len(entity.DetailOrders))
	for i, order := range entity.DetailOrders {
		detailOrders[i] = DetailOrderToResponse(order)
	}

	return &model.OrderResponse{
		ID:           entity.ID,
		Total:        entity.Total,
		Profit:       entity.Profit,
		Status:       entity.Status,
		CreatedAt:    entity.CreatedAt,
		DetailOrders: detailOrders,
		User:         UserToResponse(entity.User),
	}
}
