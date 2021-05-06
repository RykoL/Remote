package service

import (
	"github.com/go-vgo/robotgo"
	"github.com/rykol/remote/web/dto"
	"github.com/rykol/remote/service/domain"
	"log"
)

type MouseJob struct {
	jobType string
	data    interface{}
}

type MouseWorker struct {
	config *domain.Config
	jobQueue chan MouseJob
}

func NewMouseWorker(config *domain.Config) MouseWorker {
	return MouseWorker{
		config,
		make(chan MouseJob),
	}
}

func (worker MouseWorker) Run() {
	for {
		job := <-worker.jobQueue
		switch job.jobType {
		case "move":
			worker.moveMouse(job.data.(dto.MouseMoveDTO))
		case "scroll":
			worker.scroll(job.data.(dto.ScrollDTO))
		case "click":
			robotgo.Click("left", false)
		}
	}
}

func (w MouseWorker) moveMouse(move dto.MouseMoveDTO) {
	x, y := robotgo.GetMousePos()

	dx := int(float64(move.DX) * w.config.MouseSensitivity)
	dy := int(float64(move.DY) * w.config.MouseSensitivity)


	log.Printf("Moving mouse to x: %d y: %d \n", x, y)
	robotgo.MoveMouseSmooth(x + dx, y + dy)
}

func (w MouseWorker) scroll(sc dto.ScrollDTO) {

	dy := int(float64(sc.DY) * w.config.MouseSensitivity)

	log.Printf("Scrolling %d %s", dy, sc.Direction)

	robotgo.ScrollMouse(sc.DY, sc.Direction)
}
