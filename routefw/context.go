package routefw

import (
	"github.com/gin-gonic/gin/render"
	"net/http"
)

type Context struct {
	Request 			*http.Request
	writermem 			responseWriter
	Params	 			Params
	handler 			HandlerFunc
	fullPath 			string
	Writer    			ResponseWriter
	route				*Route
}

func (c *Context) reset()  {
	c.Writer = &c.writermem
	c.Params = c.Params[0:0]
	c.handler = nil
	c.fullPath = ""
}

func (c *Context) Param(key string) string{
	return c.Params.ByName(key)
}

func(c *Context) Status(code int){
	c.Writer.WriteHeader(code)
}

func (c *Context) Render(code int, r render.Render){
	c.Status(code)
	if !bodyAllowedForStatus(code){
		r.WriteContentType(c.Writer)
		c.Writer.WriteHeaderNow()
		return
	}
	if err := r.Render(c.Writer); err != nil{
		panic(err)
	}
}

func (c *Context) JSON(code int, obj interface{}){
	c.Render(code, render.AsciiJSON{Data: obj})
}