package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
	"slices"
)

func ProductsToResponseGetAll(product *entity.Product) *model.ProductResponse {
	return &model.ProductResponse{
		ID:            product.ID,
		Name:          product.Name,
		Price:         product.Price,
		Qty:           product.Qty,
		Description:   product.Description,
		CreatedAt:     product.CreatedAt,
		Category:      product.Category,
		ImageProducts: product.ImageProducts,
		LikedCount:    len(product.LikedByUsers),
	}
}

func ProductToResponseGetDetails(product *entity.Product, id ...string) *model.ProductResponse {

	return &model.ProductResponse{
		ID:            product.ID,
		Name:          product.Name,
		Price:         product.Price,
		Qty:           product.Price,
		Description:   product.Description,
		CreatedAt:     product.CreatedAt,
		Category:      product.Category,
		ImageProducts: product.ImageProducts,
		Liked: func(p []entity.User) bool {
			if len(id) == 1 {
				return slices.ContainsFunc(product.LikedByUsers, func(user entity.User) bool {
					return user.ID == id[0]
				})
			}

			return false
		}(product.LikedByUsers),
		LikedCount: len(product.LikedByUsers),
	}
}
