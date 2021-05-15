package controller

import (
	"net/http"
	"web/routefw"
	"web/util"
)

func Hello(c *routefw.Context){
	util.ExtractTokenMetadata(c.Request)
	c.JSON(http.StatusOK, "abc")
}

