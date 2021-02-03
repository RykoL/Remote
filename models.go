package main

type MouseMove struct {
	DX int `json:dx`
	DY int `json:dy`
}

type Dimension struct {
	Width  int
	Height int
}
