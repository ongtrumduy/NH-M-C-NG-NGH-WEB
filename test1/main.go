package main

import (
	"web/modules/question"
)

func main() {
	//controller.CreateQuestion()
	question.GetPaginateQuestionByTestId("607e8a8438cd365f6e5083ec", 1, 3)
}