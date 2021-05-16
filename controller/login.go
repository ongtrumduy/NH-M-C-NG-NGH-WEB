package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
	"web/util"
)

func Login(c *routefw.Context){
	fmt.Println("login")
	user := &newModel.User{}
	err := c.DecodeJson(user)

	if err != nil{
		c.JSON(http.StatusUnprocessableEntity, "Invalid json provided")
		return
	}

	fmt.Println("user ", user)

	filter := bson.D{
		{
			"UserName", user.UserName,
		},
		{
			"PassWord", user.PassWord,
		},
	}
	result := db.FindOne("user", filter)
	if result.Err() != nil{
		fmt.Println("invalid")
		response := newModel.ResponseValidate{CheckValidate: "invalid"}
		c.JSON(http.StatusOK, response)
		return
	}
	u := newModel.User{}
	result.Decode(&u)
	if u.UserName != user.UserName || u.PassWord != user.PassWord{
		fmt.Println("incorrect user name or password")

		c.JSON(http.StatusUnauthorized, newModel.ResponseValidate{CheckValidate: "invalid"})
		return
	}
	ts, err := util.CreateToken(u.ID)
	if err != nil{
		fmt.Println("token err 1")
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	saveErr := util.CreateAuth(u.ID.String(), ts)
	if saveErr != nil{
		fmt.Println("token err 2")
		c.JSON(http.StatusUnprocessableEntity, saveErr)
		return
	}
	//tokens := map[string]string{
	//	"access_token":  ts.AccessToken,
	//	"refresh_token": ts.RefreshToken,
	//}
	fmt.Println("ok")
	responseLogin := newModel.ResponseLogin{
		CheckValidate: "success-login",
		MemberID:      u.ID,
		AccessToken:   ts.AccessToken,
		RefreshToken:  ts.RefreshToken,
	}
	c.JSON(http.StatusOK, responseLogin)
}