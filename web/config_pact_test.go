package web

import (
	"net/http"
	"github.com/rykol/remote/service/domain"
	"testing"
	"github.com/pact-foundation/pact-go/dsl"
	"github.com/pact-foundation/pact-go/types"
	"fmt"
	"path/filepath"
	"os"
)

var dir, _ = os.Getwd()
var pactDir = "../remote-frontend/pacts"

func startServer() {
	mux := http.NewServeMux()
	config := domain.NewDefaultConfig()
	configController := NewConfigController(&config)
	configController.RegisterConfigRoutes(mux)

	http.ListenAndServe("localhost:8000", mux)
}

func TestConfigProvider(t *testing.T) {
	pact := dsl.Pact {
		Provider: "RemoteApi",
			Consumer: "RemoteFrontend",
			DisableToolValidityCheck: true,
			LogDir: "./logs",
			LogLevel: "INFO",
	}

	go startServer()

_,	 err := pact.VerifyProvider(t, types.VerifyRequest {
		ProviderBaseURL: "http://localhost:8000",
		PactURLs: []string{filepath.ToSlash(fmt.Sprintf("%s/remotefrontend-remoteapi.json", pactDir))},
		StateHandlers: types.StateHandlers{
			"no config has been set": func() error {
				return nil
			},
		},
	})

	if err != nil {
		t.Fatal(err)
	}
}
