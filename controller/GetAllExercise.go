package controller

import (
	"fmt"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func GetAllExercises(c *routefw.Context){
	exercises, err := db.FindAllExercise()
	if err != nil{
		fmt.Println("err ", err)
	}
	fmt.Println("exercise ", exercises)
	list := newModel.ListExercise{
		List: exercises,
	}
	c.JSON(http.StatusOK, list)
}