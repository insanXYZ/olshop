package model

type WebResponse struct {
	Data    any    `json:"data,omitempty"`
	Message string `json:"message,omitempty"`
}
