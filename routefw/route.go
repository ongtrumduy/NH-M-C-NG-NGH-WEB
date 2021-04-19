package routefw

import (
	"fmt"
	"net/http"
	"sync"
)


type Route struct {
	basePath	 		string
	pool				sync.Pool
	UseRawPath			bool
	UnescapePathValues 	bool
	nodes				methodNodes
}


type HandlerFunc func(*Context)

type HandlersChain []HandlerFunc

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

//inheritance func ServeHTTP of http.Handler interface to implement route

func (r *Route) ServeHTTP(w http.ResponseWriter, request *http.Request){
	c := r.pool.Get().(*Context)
	c.Request = request
	c.writermem.reset(w)
	c.reset()
	r.handleHttpRequest(c)
	r.pool.Put(c)
}

//handle http request receive for method like put get post
func (r *Route) handleHttpRequest(c *Context){
	httpMethod := c.Request.Method
	rPath := c.Request.URL.Path
	unescape := false
	if r.UseRawPath && len(c.Request.URL.RawPath) > 0{
		rPath = c.Request.URL.RawPath
		unescape = r.UnescapePathValues
	}
	nodes := r.nodes
	for i := 0; i < len(nodes); i++{
		if nodes[i].method != httpMethod{
			continue
		}
		root := nodes[i].root
		value := root.getValue(rPath, c.Params, unescape)
		if value.handler != nil{
			c.handler = value.handler
			c.Params = value.params
			c.fullPath = value.fullPath
		}

	}
}