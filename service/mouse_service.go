package service

import (
	"github.com/rykol/remote/web/dto"
)

type MouseService struct {
	worker MouseWorker
}

func NewMouseService(worker MouseWorker) MouseService {
	return MouseService{
		worker: worker,
	}
}

func (service *MouseService) Move(move dto.MouseMoveDTO) {
	service.worker.jobQueue <- MouseJob{"move", move}
}

func (service *MouseService) Scroll(scroll dto.ScrollDTO) {
	service.worker.jobQueue <- MouseJob{"scroll", scroll}
}

func (service *MouseService) Click() {
	service.worker.jobQueue <- MouseJob{"click", nil}
}
