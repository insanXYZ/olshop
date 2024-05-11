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
