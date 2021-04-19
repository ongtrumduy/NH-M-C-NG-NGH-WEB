package route

import (
	"fmt"
	"log"
	"net/http"

)


type Route struct {
	basePath string
}


type HandlerFunc func(*Context)

func (route *Route) ServeHTTP(w http.ResponseWriter, r *http.Request){
	log.Printf("[%s] %q %v\n", r.Method, r.URL.String())
}

func NewRoute() (route *Route){
	route.basePath = "/"
	return
}

func (r *Route) calculateAbsolutePath(relativePath string) string{
	return joinPaths(r.basePath, relativePath)
}

func (r *Route)handle(method string, relativePath string, handler HandlerFunc){
	absolutePath := r.calculateAbsolutePath(relativePath)
	fmt.Println(absolutePath)
}

func (r *Route)Get(relativePath string, handler HandlerFunc){
	r.handle(http.MethodGet, relativePath, handler)
}

func (r *Route) addRoute(){

}