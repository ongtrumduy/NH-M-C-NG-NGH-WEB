package test

import (
	"log"
	"web/db"
	"web/model"
)

func GetTestById(testId string)  (a model.Test){
	var test =  model.Test{}

	// lấy 1 test
	testFind := db.FindById(test.GetName(), testId)
	decodeError := testFind.Decode(&test)
	if decodeError != nil {
		log.Println("Decode error: ", decodeError)
	}

	return test
}