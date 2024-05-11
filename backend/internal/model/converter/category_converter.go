package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func CategoryToResponse(category *entity.Category) *model.CategoryResponse {
	if category == nil {
		return nil
	}

	return &model.CategoryResponse{
		ID:        category.ID,
		Name:      category.Name,
		CreatedAt: category.CreatedAt,
	}
}
