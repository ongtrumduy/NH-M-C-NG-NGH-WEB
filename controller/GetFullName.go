package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetFullName(c *routefw.Context)  {
	fmt.Println("get full name")
	data := &newModel.RequestDataGetFullName{}
	c.DecodeJson(data)
	fmt.Println("data ", data)
	filter := bson.D{
		{
			"_id", data.MemberID,
		},
	}
	result := db.FindOne("user", filter)
	user := &newModel.User{}
	result.Decode(user)
	fmt.Println("user ", user)
	c.JSON(http.StatusOK, user)
}