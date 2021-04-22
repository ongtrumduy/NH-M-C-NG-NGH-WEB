package controller

import (
	"net/http"
	"web/routefw"
)

func Hello(c *routefw.Context){
	c.JSON(http.StatusOK, "abc")
}

func Hello1(c *routefw.Context){
	c.JSON(http.StatusOK, "def")
}