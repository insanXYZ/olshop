package middleware

import "github.com/spf13/viper"

type MiddlewareConfig struct {
	viper *viper.Viper
}

func NewMiddlewareConfig(viper *viper.Viper) *MiddlewareConfig {
	return &MiddlewareConfig{viper: viper}
}
