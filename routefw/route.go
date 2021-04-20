package routefw

import (
	"fmt"
	"net/http"
	"sync"
)

var (
	default404Body   = []byte("404 page not found")
)

type Route struct {
	basePath           string
	pool               sync.Pool
	UseRawPath         bool
	UnescapePathValues bool
	trees              methodNodes
	allNoRoute         HandlerFunc
}


type HandlerFunc func(*Context)


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

var methods = map[string]bool{http.MethodDelete: true, http.MethodPost: true, http.MethodGet: true}

func (r *Route) addRoute(method string, path string, handle HandlerFunc){
	if path[0] != '/'{
		panic("path error, path must begin with /")
	}
	_, ok := methods[method]
	if !ok{
		panic("method must be post, delete or get")
	}
	if handle == nil{
		panic("handle cannot be nil")
	}
	root := r.trees.get(method)
	if root == nil{
		root = new(node)
		root.fullPath = "/"
		r.trees = append(r.trees, methodNode{
			method: method,
			root:   root,
		})
	}
	root.addRoute(path, handle)


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
	nodes := r.trees
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
			c.handler(c)
			c.writermem.WriteHeaderNow()
			return
		}
	}
	c.handler = r.allNoRoute
	serveError(c, http.StatusNotFound, default404Body)
}

var mimePlain = []string{"text/plain"}

func serveError(c *Context, code int, defaultMessage []byte){
	c.writermem.status = code
	if c.writermem.Written(){
		return
	}
	if c.writermem.Status() == code{
		c.writermem.Header()["Content-Type"] = mimePlain
		_, err := c.writermem.Write(defaultMessage)
		if err != nil{
			fmt.Println("err :", err)
		}
		return
	}
	c.writermem.WriteHeaderNow()
}

