package domain

type Config struct {
	MouseSensitivity  float64 `json:"mouseSensitivity"`
	ScrollSensitivity float64 `json:"scrollSensitivity"`
}

func NewDefaultConfig() Config {
	return Config{1.0, 1.0}
}
