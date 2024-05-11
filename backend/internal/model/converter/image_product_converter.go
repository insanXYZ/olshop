package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func ImageProductToResponse(imageProduct *entity.ImageProduct) *model.ImageProductResponse {

	if imageProduct == nil {
		return nil
	}

	return &model.ImageProductResponse{
		ID:        imageProduct.ID,
		Name:      imageProduct.Name,
		URL:       "http://localhost:1323/storage/product/" + imageProduct.Name,
		CreatedAt: imageProduct.CreatedAt,
		Product:   ProductToResponse(imageProduct.Product),
	}
}
