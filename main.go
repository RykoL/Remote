package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

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

	baseDir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	assetDir := filepath.Join(baseDir, "assets")

	mux := http.NewServeMux()

	config := domain.NewDefaultConfig()
	configController := web.NewConfigController(&config)

	staticController := web.SPAStaticHandler{StaticPath: assetDir, IndexPath: "index.html"}
	staticController.RegisterStaticFileRoutes(mux)

	mouseWorker := service.NewMouseWorker(&config)
	go mouseWorker.Run()
	mouseService := service.NewMouseService(mouseWorker)

	web.RegisterMouseRoutes(mux, mouseService)
	configController.RegisterConfigRoutes(mux)

	log.Printf("Serving at 0.0.0.0:%s", port)
	http.ListenAndServe("0.0.0.0:"+port, mux)
}
