package main

import (
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"net/http"
	"time"
	"web/routefw"
)

func main(){
	r := routefw.NewRoute()
	h2s := &http2.Server{}
	addr := "0.0.0.0:8080"
	server := http.Server{
		Handler: h2c.NewHandler(r, h2s),
		Addr: addr,
		ReadTimeout: time.Second *5,
		WriteTimeout: time.Second*10,
	}
	server.ListenAndServe()
}