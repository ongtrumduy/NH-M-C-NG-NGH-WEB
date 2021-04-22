package test

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"web/db"
	"web/model"
)

func GetPaginateTest (level string, page int64, perPage int64) (a []model.Test){
	var tests = [] model.Test{}

	// filter
	filter := bson.D{{ "level", level }}
	skip := int64((page - 1) * perPage)
	opts := options.FindOptions{
		Skip: &skip,
		Limit: &perPage,
	}

	// query
	cursor, err := db.Find(model.Test{}.GetName(), filter, &opts)
	if err = cursor.All(context.TODO(), &tests); err != nil {
		log.Fatal(err)
	}

	return tests
}

//func CreateTest() {
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

//func EvaluateTest(testId string, data bson.D) (a model.Test)  {
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
