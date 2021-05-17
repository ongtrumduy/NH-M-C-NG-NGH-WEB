package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func Register(c *routefw.Context){
	fmt.Println("register")
	user := &newModel.User{}
	err := c.DecodeJson(user)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusOK, err.Error())
		return
	}
	filter := bson.D{
		{
			"UserName", user.UserName,
		},
	}

	result := db.FindOne("user", filter)
	if result.Err() == nil{
		fmt.Println("existed-username")
		response := newModel.ResponseValidate{CheckValidate: "existed-username"}
		c.JSON(http.StatusOK, response)
		return
	}
	filter = bson.D{
		{
			"PhoneNumber", user.PhoneNumber,
		},
	}
	result = db.FindOne("user",filter)
	if result.Err() == nil{
		fmt.Println("existed-phonenumber")
		response := newModel.ResponseValidate{CheckValidate: "existed-phonenumber"}
		c.JSON(http.StatusOK, response)
		return
	}
	user.ID = primitive.NewObjectID()
	_, err = db.InsertOne("user", user)

	if err != nil{
		c.JSON(http.StatusInternalServerError, err.Error())
	}else{
		fmt.Println( "success-register")
		r := newModel.ResponseValidate{CheckValidate:  "success-register"}
		c.JSON(http.StatusCreated, r)
	}

}