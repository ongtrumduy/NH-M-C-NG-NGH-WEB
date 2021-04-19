package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Hello(c *gin.Context){
	a := c.Param("abc")
	fmt.Println("a", a)
	c.JSON(http.StatusOK, "hello")
}

func Hello1(c *gin.Context){
	a := c.Param("abc")
	fmt.Println("a", a)
	c.JSON(http.StatusOK, "hello")
}

func Hello2(c *gin.Context){
	a := c.Param("abc")
	fmt.Println("a", a)
	c.JSON(http.StatusOK, "hello")
}