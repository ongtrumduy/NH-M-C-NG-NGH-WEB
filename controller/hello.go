package controller

import (
	"net/http"
	"web/routefw"
)

func Hello(c *routefw.Context){
	c.JSON(http.StatusOK, "abc")
}

