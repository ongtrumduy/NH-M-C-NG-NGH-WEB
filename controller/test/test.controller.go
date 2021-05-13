package test

import (
	"net/http"
	"strconv"
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

//func CreateTestController() {
//	ans1 := model.Answer{
//		Title: "1",
//	}
//	ans2 := model.Answer{
//		Title: "2",
//	}
//	var ans []model.Answer
//	ans = append(ans, ans1, ans2)
//
//	questionModel := model.Question{
//		Title:         	"question1",
//		Answers: 		ans,
//		CorrectAnswer: 	ans1,
//	}
//	//db.InsertOne("exam", "questions", questionModel)
//
//	filter := bson.D{{}}
//	question1, err := db.Find("exam", "questions", questionModel, filter)
//	if err != nil{
//		fmt.Println(err)
//	}
//
//	var results []bson.M
//	var questions [10]model.Question
//
//	//if err = question1.All(context.TODO(), &results); err != nil {
//	//	log.Fatal(err)
//	//}
//	fmt.Println("result")
//	for i, result := range results {
//		fmt.Println(result)
//
//		bsonBytes, _ := bson.Marshal(result)
//		bson.Unmarshal(bsonBytes, &questions[i])
//		//fmt.Println(questions)
//	}
//
//	fmt.Println(questions, questions[0].Title)
//}

//func EvaluateTestController(testId string, data bson.D) (a model.Test)  {
//	var test =  model.Test{}
//
//	// lấy 1 test2
//	testFind := db.FindById("exam", "tests", testId)
//	decodeError := testFind.Decode(&test)
//	if decodeError != nil {
//		log.Println("Decode error: ", decodeError)
//	}
//
//	return
//}
