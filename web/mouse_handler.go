package web

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rykol/remote/service"
	"github.com/rykol/remote/web/dto"
)

var mouseService service.MouseService

func handleScroll(w http.ResponseWriter, req *http.Request) {

	SetupCors(&w)

	if (*req).Method == "OPTIONS" {
		return
	}

	var scrollDelta dto.ScrollDTO
	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(&scrollDelta)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Scrolling %d", scrollDelta.DY)
	mouseService.Scroll(scrollDelta)
}

func handleMove(w http.ResponseWriter, req *http.Request) {

	SetupCors(&w)

	if (*req).Method == "OPTIONS" {
		return
	}

	var mouseDelta dto.MouseMoveDTO
	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(&mouseDelta)
	if err != nil {
		log.Printf("Error decoding req: %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Moving mouse by x: %d y: %d \n", mouseDelta.DX, mouseDelta.DY)
	mouseService.Move(mouseDelta)
}

func handleClick(w http.ResponseWriter, req *http.Request) {

	SetupCors(&w)

	if (*req).Method == "OPTIONS" {
		return
	}

	log.Print("Issuing click event")

	mouseService.Click()
}

func RegisterMouseRoutes(mux *http.ServeMux, serv service.MouseService) {
	mouseService = serv
	mux.HandleFunc("/api/mouse/move", handleMove)
	mux.HandleFunc("/api/mouse/click", handleClick)
	mux.HandleFunc("/api/mouse/scroll", handleScroll)
}
