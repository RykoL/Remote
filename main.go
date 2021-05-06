package main

import (
	"log"
	"net/http"
	"os"

	"github.com/rykol/remote/service"
	"github.com/rykol/remote/service/domain"
	"github.com/rykol/remote/web"
)

func setupCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	fs := http.FileServer(http.Dir("./assets"))
	mux := http.NewServeMux()

	mux.Handle("/", fs)

	config := domain.NewDefaultConfig()
	configController := web.NewConfigController(&config)

	mouseWorker := service.NewMouseWorker(&config)
	go mouseWorker.Run()
	mouseService := service.NewMouseService(mouseWorker)

	web.RegisterMouseRoutes(mux, mouseService)
	configController.RegisterConfigRoutes(mux)

	log.Printf("Serving at 0.0.0.0:%s", port)
	http.ListenAndServe("0.0.0.0:"+port, mux)
}
