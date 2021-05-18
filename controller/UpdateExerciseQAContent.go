package controller

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func UpdateExcerciseQA(c *routefw.Context){
	fmt.Println("update exercise ")
	excercise := &newModel.Excercise{}
	c.DecodeJson(excercise)
	fmt.Println("excercise ",excercise)
	filter := bson.D{
		{
			"ExcerciseName",excercise.ExcerciseName,
		},
	}
	update := bson.M{"$set": bson.M{"ExcerciseQAContent": excercise.ExcerciseQAContent}}
	err := db.FindOneAndUpdate("Excercise", filter, update)
	if err != nil{
		fmt.Println("err ", err)
	}
	c.JSON(http.StatusOK, newModel.ResponseValidate{CheckValidate: "success-create-excercise-content"})
}