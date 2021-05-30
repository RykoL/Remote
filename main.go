package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/rykol/remote/service"
	"github.com/rykol/remote/service/domain"
	"github.com/rykol/remote/web"
	"strconv"
	"fmt"
	"os/exec"
	"runtime"
)


func openBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	baseDir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	assetDir := filepath.Join(baseDir, "assets")

	mux := http.NewServeMux()

	numberPort, _ := strconv.Atoi(port)
	config := domain.NewDefaultConfig(numberPort)
	configController := web.NewConfigController(&config)

	staticController := web.SPAStaticHandler{StaticPath: assetDir, IndexPath: "index.html"}
	staticController.RegisterStaticFileRoutes(mux)

	mouseWorker := service.NewMouseWorker(&config)
	go mouseWorker.Run()
	mouseService := service.NewMouseService(mouseWorker)

	web.RegisterMouseRoutes(mux, mouseService)
	configController.RegisterConfigRoutes(mux)

	log.Printf("Serving at 0.0.0.0:%s", port)
	openBrowser("http://localhost:" + port + "/welcome")
	http.ListenAndServe("0.0.0.0:"+port, mux)
}
