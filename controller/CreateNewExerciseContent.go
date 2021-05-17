package controller

import (
	"fmt"
	"net/http"
	"web/db"
	"web/newModel"
	"web/routefw"
)

func ExerciseCreateNewContent(c *routefw.Context)  {
	exercise := &newModel.Excercise{}
	err := c.DecodeJson(exercise)
	if err != nil{
		fmt.Println("err ", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	fmt.Println("exercise ", exercise)
	_, err = db.InsertOne("exercise", exercise)
	if err != nil{
		c.JSON(http.StatusBadRequest, err)
	}
	c.JSON(http.StatusCreated, "ok")
}