package main

import (
	"backend/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	log := config.NewLogger()
	db := config.NewDatabase(viperConfig, log)
	validate := config.NewValidator()
	app := config.NewEcho(log)

	config.Bootstrap(&config.BootstrapConfig{
		DB:          db,
		App:         app,
		Log:         log,
		Validate:    validate,
		ViperConfig: viperConfig,
	})

	port := viperConfig.GetString("WEB_PORT")

	app.Logger.Fatal(app.Start(port))
}
