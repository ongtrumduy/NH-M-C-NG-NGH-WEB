package route

import (
	"web/controller"
	"web/routefw"
)

type MyRoute struct{
	name 		string
	path 		string
	method		string
	handler     func(c *routefw.Context)
}

func NewRouter() *routefw.Route{
	r := routefw.NewRoute()
	addRoute(r)
	return r
}


func addRoute(r *routefw.Route) *routefw.Route{
	for _, route := range routers{
		switch route.method {
		case "post":
			r.Post(route.path, route.handler)
		case "get":
			r.Get(route.path, route.handler)
		case "delete":
			r.Delete(route.path, route.handler)
		}
	}
	return r
}

var routers = []MyRoute{
	{
		name:    "hello",
		path:    "/hello/:abc/:xyz/",
		method:  "get",
		handler: controller.Hello,
	},

}


