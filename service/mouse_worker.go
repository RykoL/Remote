package service

import (
	"github.com/go-vgo/robotgo"
	"github.com/rykol/remote/web/dto"
)

type MouseJob struct {
	jobType string
	data    interface{}
}

type MouseWorker struct {
	jobQueue chan MouseJob
}

func NewMouseWorker() MouseWorker {
	return MouseWorker{
		make(chan MouseJob),
	}
}

func (worker *MouseWorker) Run() {
	for {
		job := <-worker.jobQueue
		switch job.jobType {
		case "move":
			moveMouse(job.data.(dto.MouseMoveDTO))
		case "scroll":
			scroll(job.data.(dto.ScrollDTO))
		case "click":
			robotgo.Click("left", false)
		}
	}
}

func moveMouse(move dto.MouseMoveDTO) {
	x, y := robotgo.GetMousePos()

	robotgo.MoveMouseSmooth(x+move.DX, y+move.DY)
}

func scroll(sc dto.ScrollDTO) {
	robotgo.ScrollMouse(sc.DY, sc.Direction)
}
