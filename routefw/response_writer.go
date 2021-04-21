package routefw

import (
	"fmt"
	"net/http"
)

type responseWriter struct {
	http.ResponseWriter
	size   int
	status int
}

const (
	noWritten     = -1
	defaultStatus = http.StatusOK
)

func (w *responseWriter) reset(writer http.ResponseWriter) {
	w.ResponseWriter = writer
	w.size = noWritten
	w.status = defaultStatus
}

func (w *responseWriter) Written() bool {
	return w.size != noWritten
}


func (w *responseWriter) Status() int {
	return w.status
}

func (w *responseWriter) Write(data []byte) (n int, err error) {
	w.WriteHeaderNow()
	n, err = w.ResponseWriter.Write(data)
	w.size += n
	return
}

func (w *responseWriter) WriteHeader(code int){
	if code > 0 && w.status != code{
		if w.Written(){
			fmt.Println("Header were already written")
		}
		w.status = code
	}
}

func (w *responseWriter) WriteHeaderNow(){
	if !w.Written(){
		w.size = 0
		w.ResponseWriter.WriteHeader(w.status)
	}
}

type ResponseWriter interface{
	Write([]byte) (int, error)
	WriteHeader(statusCode int)
	//WriteHeaderNow()
}



