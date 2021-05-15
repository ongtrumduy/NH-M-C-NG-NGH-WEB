package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/model"
	"web/routefw"
	"web/util"
)

func Login(c *routefw.Context){
	fmt.Println("login")
	user := &model.User{}
	err := c.DecodeJson(user)
	if err != nil{
		c.JSON(http.StatusUnprocessableEntity, "Invalid json provided")
		return
	}
	filter := bson.D{
		{
			"user_name", user.UserName,
		},
		{
			"pass_word", user.PassWord,
		},
	}
	result := db.FindOne("user", filter)
	if result.Err() != nil{
		c.JSON(http.StatusUnauthorized, "incorrect user name or password")
		return
	}
	u := model.User{}
	result.Decode(&u)
	if u.UserName != user.UserName || u.PassWord != user.PassWord{
		c.JSON(http.StatusUnauthorized, "incorrect user name or password")
	}
	ts, err := util.CreateToken(u.ID)
	if err != nil{
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	saveErr := util.CreateAuth(u.ID, ts)
	if saveErr != nil{
		c.JSON(http.StatusUnprocessableEntity, saveErr)
		return
	}
	tokens := map[string]string{
		"access_token":  ts.AccessToken,
		"refresh_token": ts.RefreshToken,
	}
	c.JSON(http.StatusOK, tokens)
}