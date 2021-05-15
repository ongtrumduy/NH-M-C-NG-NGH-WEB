package controller

import (
	"net/http"
	"web/routefw"
	"web/util"
)

func Logout(c *routefw.Context){
	metadata, err := util.ExtractTokenMetadata(c.Request)
	if err != nil{
		c.JSON(http.StatusUnauthorized, err)
		return
	}

	deleteErr := util.DeleteTokens(metadata)
	if err != nil{
		c.JSON(http.StatusUnauthorized, deleteErr)
	}
	c.JSON(http.StatusOK, "logout success")
}

