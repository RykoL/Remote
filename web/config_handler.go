package web

import (
	"encoding/json"
	"log"
	"net/http"
	"net"
	"fmt"
	"github.com/rykol/remote/service"
	"github.com/rykol/remote/service/domain"
	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
	"image/png"
	"image/color"
)

type ConfigController struct {
	config *domain.Config
}

func getOutboundIP() net.IP {
    conn, err := net.Dial("udp", "8.8.8.8:80")
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()

    localAddr := conn.LocalAddr().(*net.UDPAddr)

    return localAddr.IP
}

func ConstructRemoteUrl(protocol string, localIp net.IP, port int) string {
	return fmt.Sprintf("%s://%s:%d", protocol, localIp.String(), port)
}

func NewConfigController(config *domain.Config) ConfigController {
	return ConfigController {config}
}

func (c ConfigController) ConfigGetHandler(w http.ResponseWriter, req *http.Request) {
	log.Printf("Got config  %+v\n", c.config)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(c.config)
}

func (c ConfigController) WhoAmI(w http.ResponseWriter, req *http.Request) {
	SetupCors(&w)
	url := ConstructRemoteUrl("http", getOutboundIP(), c.config.Port)
	w.Write([]byte(url))
}

func (c ConfigController) GetLocationQRCode(w http.ResponseWriter, req *http.Request) {
	SetupCors(&w)
	dataString := ConstructRemoteUrl("http", getOutboundIP(), c.config.Port)

	qrCode, err := qr.Encode(dataString, qr.L, qr.Auto)
	if err != nil {
		log.Println(err)
	}
	qrCode, err = barcode.Scale(qrCode, 512, 512)
	if err != nil {
		log.Println(err)
	}
	fff := service.ConvertToAplha(qrCode, color.White)

	png.Encode(w, fff)
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
	mux.HandleFunc("/api/settings", c.ConfigMethodRouter)
	mux.HandleFunc("/api/settings/whoami", c.WhoAmI)
	mux.HandleFunc("/api/settings/whoami/qr", c.GetLocationQRCode)
}
