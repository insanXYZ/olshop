package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
	"slices"
)

func ProductToResponse(product *entity.Product) *model.ProductResponse {

	if product == nil {
		return nil
	}

	imageProduct := make([]*model.ImageProductResponse, len(product.ImageProducts))
	if len(product.ImageProducts) > 0 {
		for i, image := range product.ImageProducts {
			imageProduct[i] = ImageProductToResponse(image)
		}
	}

	return &model.ProductResponse{
		ID:            product.ID,
		Name:          product.Name,
		Price:         product.Price,
		Qty:           product.Qty,
		Description:   product.Description,
		CreatedAt:     product.CreatedAt,
		Category:      CategoryToResponse(product.Category),
		ImageProducts: imageProduct,
		LikedCount:    len(product.LikedByUsers),
	}
}

func ProductToResponseWithLiked(product *entity.Product, id ...string) *model.ProductResponse {
	res := ProductToResponse(product)
	res.Liked = func(p []*entity.User) bool {
		if len(id) == 1 {
			return slices.ContainsFunc(p, func(user *entity.User) bool {
				return user.ID == id[0]
			})
		}
		return false
	}(product.LikedByUsers)
	res.LikedCount = len(product.LikedByUsers)

	return res
}
