package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"web/db"
	"web/model"
	"web/routefw"
)

func Register(c *routefw.Context){
	fmt.Println("register")
	user := &model.User{}
	err := c.DecodeJson(user)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	filter := bson.D{
		{
			"user_name", user.UserName,
		},
		{
			"email", user.Email,
		},
	}

	result := db.FindOne("user", filter)
	if result.Err() == nil{
		c.JSON(http.StatusConflict, "user exist")
		return
	}
	user.ID = primitive.NewObjectID()
	err = db.InsertOne("user", user)
	if err != nil{
		c.JSON(http.StatusInternalServerError, err)
	}else{
		c.JSON(http.StatusCreated, "ok")
	}

}