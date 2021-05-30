package service

import (
	"image"
	"image/color"
)

func ConvertToAplha(src image.Image, alphaColor color.Color) image.Image {
	imageWithAlpha := image.NewNRGBA(src.Bounds())

	size := src.Bounds().Size()

	for x := 0; x < size.X; x++ {
		for y := 0; y < size.Y; y++ {
			colorAtPoint := src.At(x, y)

			if alphaColor == colorAtPoint {
				imageWithAlpha.Set(x, y, color.RGBA{0xff, 0xff, 0xff, 0x00})
			} else {
				imageWithAlpha.Set(x, y, colorAtPoint)
			}
		}
	}


	return imageWithAlpha
}
