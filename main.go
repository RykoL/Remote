package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/go-vgo/robotgo"
)

func setupCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func handleScroll(w http.ResponseWriter, req *http.Request) {

	setupCors(&w)

	if (*req).Method ==  "OPTIONS" {
		return
	}

	var scrollDelta ScrollDTO
	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(&scrollDelta)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Scrolling %d", scrollDelta.DY)
	go scroll(scrollDelta.DY, scrollDelta.Direction)
}

func handleMove(w http.ResponseWriter, req *http.Request) {

	setupCors(&w)

	if (*req).Method ==  "OPTIONS" {
		return
	}
	
	var mouseDelta MouseMove
	decoder := json.NewDecoder(req.Body)

	err := decoder.Decode(&mouseDelta)
	if err != nil {
	        log.Printf("Error decoding req: %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Moving mouse by x: %d y: %d \n", mouseDelta.DX, mouseDelta.DY)

	go moveMouse(mouseDelta.DX, mouseDelta.DY)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func handleClick(w http.ResponseWriter, req *http.Request) {

	setupCors(&w)

	if (*req).Method ==  "OPTIONS" {
		return
	}

	log.Print("Issuing click event")
	
	go robotgo.MouseClick("left", false)
}

func logHandler(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	defer req.Body.Close()
	log.Println(string(body))
}

func getScreenSize(w http.ResponseWriter, req *http.Request) {
	x, y := robotgo.GetScreenSize()
	json.NewEncoder(w).Encode(Dimension{Width: x, Height: y})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	fs := http.FileServer(http.Dir("./assets"))
	mux := http.NewServeMux()

	mux.Handle("/", fs)
	mux.HandleFunc("/api/log", logHandler)
	mux.HandleFunc("/api/screen/size", getScreenSize)
	mux.HandleFunc("/api/mouse/move", handleMove)
	mux.HandleFunc("/api/mouse/click", handleClick)
	mux.HandleFunc("/api/mouse/scroll", handleScroll)

	log.Printf("Serving at 0.0.0.0:%s", port)
	http.ListenAndServe("0.0.0.0:"+port, mux)
}
