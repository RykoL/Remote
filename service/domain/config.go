package domain

type Config struct {
	MouseSensitivity  float64 `json:"mouseSensitivity"`
	ScrollSensitivity float64 `json:"scrollSensitivity"`
	Port int
}

func NewDefaultConfig(port int) Config {
	return Config{1.0, 1.0, port}
}
