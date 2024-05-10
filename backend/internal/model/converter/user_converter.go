package converter

import (
	"backend/internal/entity"
	"backend/internal/model"
)

func UserToToken(token string) *model.UserResponse {
	return &model.UserResponse{
		Token: token,
	}
}

func UserToGetDetail(user *entity.User) *model.UserResponse {
	return &model.UserResponse{
		ID:    user.ID,
		Role:  user.Role,
		Name:  user.Name,
		Image: "http://localhost:1323/storage/user/" + user.Image,
		Email: user.Email,
	}
}
