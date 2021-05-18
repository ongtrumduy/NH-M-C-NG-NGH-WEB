package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func CreateNewExerciseContent(c *routefw.Context){
	fmt.Println("CreateNewExerciseContent")
	Excercise := &newModel.Excercise{}
	err := c.DecodeJson(Excercise)
	if err != nil{
		fmt.Println("err ", err)
	}
	fmt.Println("exercise", Excercise)

	filter := bson.D{
		{
			"ExcerciseName", Excercise.ExcerciseName,
		},
	}
	err = db.FindOne("Excercise", filter).Err()
	fmt.Println("err ", err)
	if err == nil{
		fmt.Println("err ", err)
		response := newModel.ResponseValidate{CheckValidate: "exist"}
		c.JSON(http.StatusOK, response)
		return
	}
	err = db.InsertOne("Excercise", Excercise)
	if err != nil{
		fmt.Println("err 1 ", err)
	}
	c.JSON(http.StatusOK, Excercise.ExcerciseName)

}
