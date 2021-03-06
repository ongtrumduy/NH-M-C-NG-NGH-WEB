package route

import (
	"github.com/gin-gonic/gin"
)

type Route struct{
	name 		string
	path 		string
	method		string
	handler     func(c *gin.Context)
}

func NewRouter() *gin.Engine{
	//r := gin.New()
	r := gin.Default()
	addRoute(r)
	return r
}


func addRoute(r *gin.Engine) *gin.RouterGroup{
	groups := r.Group("/web/v1")
	for _, r := range routers{
		switch r.method {
		case "put":
			groups.PUT(r.path, r.handler)
		case "get":
			groups.GET(r.path, r.handler)
		case "delete":
			groups.DELETE(r.path, r.handler)
		case "patch":
			groups.PATCH(r.path, r.handler)
		}
	}
	return groups
}

var routers = []Route{
	{
		name:    "hello",
		path:    "/",
		method:  "get",
		handler: nil,
	},
}


