package converter

import (
	"backend/internal/entity"
)

func ImageCategoryToResponse(model *entity.ImageCategory) *string {
	if model == nil {
		return nil
	}

	path := "http://localhost:1323/storage/category/" + model.Name

	return &path
}
