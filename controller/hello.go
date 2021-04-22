package controller

import (
	"fmt"
	"net/http"
	"web/routefw"
)

func Hello(c *routefw.Context){
	c.JSON(http.StatusOK, "abc")
}

func Hello1(c *routefw.Context){
	var x  Test
	c.DecodeJson(&x)
	fmt.Println(x)
	c.JSON(http.StatusOK, "def")
}

type Test struct {
	A int `json:A`
	B int `json:B`
}