package main

import (
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"net/http"
	"time"
	"web/r"
)

func main(){
	r := r.NewRouter()
	h2s := &http2.Server{}

	server := http.Server{
		Handler: h2c.NewHandler(r, h2s),
		Addr: "0.0.0.0:8080",
		ReadTimeout: time.Second *5,
		WriteTimeout: time.Second*10,
	}
	server.ListenAndServe()

}

