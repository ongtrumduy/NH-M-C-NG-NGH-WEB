package routefw

import "net/http"

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

func (w *responseWriter) WriteHeaderNow() {
	if !w.Written() {
		w.size = 0
		w.ResponseWriter.WriteHeader(w.status)
	}
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

type ResponseWriter interface{
	Write([]byte) (int, error)
}