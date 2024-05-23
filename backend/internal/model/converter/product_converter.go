package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
	"slices"
)

func ProductToResponse(product *entity.Product, idUser ...string) *model.ProductResponse {

	if product == nil {
		return nil
	}

	imageProduct := make([]*model.ImageProductResponse, len(product.ImageProducts))
	for i, image := range product.ImageProducts {
		imageProduct[i] = ImageProductToResponse(image)
	}

	cartedByUser := make([]*model.UserCartedProductResponse, len(product.CartedProductByUser))
	for i, p := range product.CartedProductByUser {
		cartedByUser[i] = UserCartedProductToResponse(p)
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
		Liked: func(p []*entity.User) bool {
			if len(idUser) == 1 {
				return slices.ContainsFunc(p, func(user *entity.User) bool {
					return user.ID == idUser[0]
				})
			}
			return false
		}(product.LikedByUsers),
		Order: len(product.Ordered),
	}
}
