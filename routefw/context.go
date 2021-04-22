package routefw

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin/render"
	"net/http"
	"net/url"
)

type Context struct {
	Request 			*http.Request
	writermem 			responseWriter
	Params	 			Params
	handler 			HandlerFunc
	fullPath 			string
	Writer    			ResponseWriter
	route				*Route
	queryCache 			url.Values
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


//handle json
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



//handle query
func(c *Context) Query(key string) string{
	c.initQueryCache()
	value, ok := c.queryCache[key]
	if ok && len(value) > 0{
		return value[0]
	}else{
		return ""
	}
}

func (c *Context) initQueryCache(){
	if c.queryCache == nil{
		if c.Request != nil{
			c.queryCache = c.Request.URL.Query()
		}else{
			c.queryCache = url.Values{}
		}
	}
}

//decode body to json
func (c *Context) DecodeJson(obj interface{}) error{
	body := c.Request.Body
	err := json.NewDecoder(body).Decode(obj)
	if err != nil{
		fmt.Println("decode err ", err)
	}
	return err
}
