package model

type ImageProductResponse struct {
	ID        int              `json:"id" `
	Name      string           `json:"name" `
	URL       string           `json:"url"`
	CreatedAt any              `json:"created_at" `
	Product   *ProductResponse `json:"product,omitempty" `
}
