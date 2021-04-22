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
	m:=c.QueryAll()
	for a, b := range m{
		fmt.Println( a, "   ", b)
	}
	c.JSON(http.StatusOK, "def")
}

type Test struct {
	A int `json:a`
	B int `json:b`
}