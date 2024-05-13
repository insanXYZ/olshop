package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func UserToResponse(user *entity.User) *model.UserResponse {
	if user == nil {
		return nil
	}

	return &model.UserResponse{
		ID:    user.ID,
		Role:  user.Role,
		Name:  user.Name,
		Image: "http://localhost:1323/storage/user/" + user.Image,
		Email: user.Email,
	}
}

func UserToResponseToken(token string) *model.UserResponse {
	return &model.UserResponse{
		Token: token,
	}
}

func UserToLikedProduct(user *entity.User) *model.UserResponse {

	sp := make([]*model.ProductResponse, len(user.LikeProducts))
	for i, prd := range user.LikeProducts {
		sp[i] = ProductToResponse(prd)
	}

	return &model.UserResponse{
		LikeProducts: sp,
	}
}
