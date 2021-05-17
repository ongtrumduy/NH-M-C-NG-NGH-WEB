package test

import (
	"fmt"
	"net/http"
	"strconv"
	"web/model"
	"web/routefw"
)

func GetTestByIdController (c *routefw.Context) {
	testId := c.Param("id")
	var test = GetTestById(testId)

	c.JSON(http.StatusOK, test)
}

func GetPaginateTestCotroller (c *routefw.Context) {
	query := c.QueryAll()
	page, _ := strconv.Atoi(query["page"])
	perPage, _ := strconv.Atoi(query["perPage"])
	var tests = GetPaginateTest(query["level"], page, perPage)

	c.JSON(http.StatusOK, tests)
}

func CreateTestController(c *routefw.Context) {
	data := &model.Test{}
	err := c.DecodeJson(data)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	var test = CreateTest(data)

	c.JSON(http.StatusOK, test)
}

func EvaluateTestController(c *routefw.Context)  {
	testId := c.Param("id")
	data := &BodyEvaluateTest{}
	err := c.DecodeJson(data)
	if err != nil{
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	var test = EvaluateTest(testId, data.UserId, data.Answers)

	c.JSON(http.StatusOK, test)
}

type BodyEvaluateTest struct {
	UserId string
	Answers [] string
}