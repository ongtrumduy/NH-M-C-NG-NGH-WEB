package r

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"web/controller"
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
	groups := r.Group("/web")
	for _, r := range routers{
		fmt.Println("r.handler ", r.handler)
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
		path:    "/hello1/",
		method:  "get",
		handler: controller.Hello1,
	},
	{
		name:    "hello",
		path:    "/hello2/:xya",
		method:  "get",
		handler: controller.Hello2,
	},
	{
		name:    "hello",
		path:    "/hello/:abc/:xyz/",
		method:  "get",
		handler: controller.Hello,
	},
	{
		name:    "hello",
		path:    "/hello3/:abc/:xyz/:edf/",
		method:  "get",
		handler: controller.Hello1,
	},
}


