package main

import (
	"github.com/go-vgo/robotgo"
)

type Position struct {
	X int `json:x`
	Y int `json:y`
}

type ScrollDTO struct {
	DY int `json:dy`
}

func moveMouse(dX, dY int) {

	x, y := robotgo.GetMousePos()

	robotgo.MoveMouseSmooth(x+dX, y+dY)
}

func scroll(dY int) {
	robotgo.ScrollMouse(dY, "up")
}
