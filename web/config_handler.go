package web

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rykol/remote/service/domain"
)

type ConfigController struct {
	config *domain.Config
}

var fuck domain.Config

func NewConfigController(config *domain.Config) ConfigController {
	return ConfigController {config}
}

func (c ConfigController) ConfigGetHandler(w http.ResponseWriter, req *http.Request) {
	log.Printf("Got config  %+v\n", c.config)
	json.NewEncoder(w).Encode(c.config)
}

func (c *ConfigController) UpdateConfigHandler(w http.ResponseWriter, req *http.Request) {

	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(c.config)
	if err != nil {
		log.Printf("Error decoding req: %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Updated config to %+v\n", c.config)
}

func (c ConfigController) ConfigMethodRouter(w http.ResponseWriter, req *http.Request) {
	SetupCors(&w)

	switch req.Method {
	case "GET":
		c.ConfigGetHandler(w, req)
	case "PUT":
		c.UpdateConfigHandler(w, req)
	case "OPTIONS":
		return
	default:
		http.Error(w, "Not supported", http.StatusMethodNotAllowed)
	}
}

func (c ConfigController) RegisterConfigRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/config", c.ConfigMethodRouter)
}
