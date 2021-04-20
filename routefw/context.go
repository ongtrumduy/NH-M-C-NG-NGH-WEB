package routefw

import "net/http"

type Context struct {
	Request 			*http.Request
	writermem 			responseWriter
	Params	 			Params
	handler 			HandlerFunc
	fullPath 			string
	Writer    			ResponseWriter
}

func (c *Context) reset()  {
	c.Writer = &c.writermem
	c.Params = c.Params[0:0]
	c.handler = nil
	c.fullPath = ""
}

