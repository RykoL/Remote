package web

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rykol/remote/service/domain"
)

var config domain.Config = domain.NewDefaultConfig()

func ConfigGetHandler(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode(config)
}

func UpdateConfigHandler(w http.ResponseWriter, req *http.Request) {
	var body domain.Config
	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(&body)
	if err != nil {
		log.Printf("Error decoding req: %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	config = body
}

func ConfigMethodRouter(w http.ResponseWriter, req *http.Request) {
	SetupCors(&w)

	switch req.Method {
	case "GET":
		ConfigGetHandler(w, req)
	case "UPDATE":
		UpdateConfigHandler(w, req)
	}
}

func RegisterConfigRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/config", ConfigMethodRouter)
}
