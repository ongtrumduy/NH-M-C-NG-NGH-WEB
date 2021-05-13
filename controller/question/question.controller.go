package question

import (
	"fmt"
	"net/http"
	"strconv"
	"web/routefw"
)

func GetPaginateQuestionByTestIdController (c *routefw.Context) {
	testId := c.Param("testId")
	query := c.QueryAll()
	page, _ := strconv.Atoi(query["page"])
	perPage, _ := strconv.Atoi(query["perPage"])
	fmt.Println("page", page)
	fmt.Println("perPage", perPage)
	fmt.Println("testId", testId)
	fmt.Println("query", query)

	var questions = GetPaginateQuestionByTestId(testId, page, perPage)

	c.JSON(http.StatusOK, questions)
}

func CreateQuestionController(c *routefw.Context) {
	CreateQuestion()
}