package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/GATEHUA/CyV/server/internal/service"
	"github.com/GATEHUA/CyV/server/setting"
)

type Api struct {
	serv *service.Serv
}

func New(serv *service.Serv) *Api {
	return &Api{serv: serv}
}

func corsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		handler.ServeHTTP(w, r)
	})
}

func (a *Api) Start(s *setting.Setting) error {
	address := fmt.Sprintf(":%s", s.Port)
	mux := http.NewServeMux()
	a.setupRoutes(mux)

	muxWithMiddleware := corsMiddleware(mux)

	log.Printf("Servidor Iniciado en el puerto %s", s.Port)
	return http.ListenAndServe(address, muxWithMiddleware)
}
