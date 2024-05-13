package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func UserCartedProductToResponse(ent *entity.UserCartedProduct) *model.UserCartedProductResponse {

	if ent == nil {
		return nil
	}

	return &model.UserCartedProductResponse{
		ID:        ent.ID,
		Qty:       ent.Qty,
		CreatedAt: ent.CreatedAt,
		User:      UserToResponse(ent.User),
		Product:   ProductToResponse(ent.Product),
	}
}
