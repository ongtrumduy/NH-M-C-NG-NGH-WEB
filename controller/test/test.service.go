package test

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"web/db"
	"web/model"
)

func GetTestById(testId string)  (a model.Test){
	var test =  model.Test{}

	// lấy 1 test
	testFind := db.FindById(test.GetCollectionName(), testId)
	fmt.Println("testFind", testFind)
	decodeError := testFind.Decode(&test)
	if decodeError != nil {
		log.Println("Decode error: ", decodeError)
	}

	return test
}

func GetPaginateTest (level string, page int, perPage int) (a []model.Test){
	var tests = [] model.Test{}

	// filter
	filter := bson.D{{ "level", level }}
	skip := int64((page - 1) * perPage)
	limit := int64(perPage)

	opts := options.FindOptions{
		Skip: &skip,
		Limit: &limit,
	}

	// query
	cursor, err := db.Find(model.Test{}.GetCollectionName(), filter, &opts)
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

func EvaluateTest(testId string, userId string, answers []string) (a model.Test)  {
	var tests =  model.Test{}
	var answerRight = [] model.Answer{}

	matchStage1 := bson.D{{ "$match", bson.D{{ "_id", testId }} }}
	lookupStage := bson.D{{ "$lookup",
		bson.D{
			{ "from", "questions" },
			{ "localField", "questions" },
			{ "foreignField", "_id" },
			{ "as", "questionDetails" },
		} ,
	}}
	unwindStage1 := bson.D{{"$unwind", "$questionDetails" }}
	unwindStage2 := bson.D{{"$unwind", "$questionDetails.answers" }}
	replaceRootStage := bson.D{{ "$replaceRoot", bson.D{{ "newRoot", "$questionDetails.answers" }} }}
	matchStage2 := bson.D{{ "$match", bson.D{{ "_id", bson.D{{ "$in", answers }} }} }}

	filter := mongo.Pipeline{matchStage1, lookupStage, unwindStage1, unwindStage2, replaceRootStage, matchStage2}

	opts := options.AggregateOptions{
	}

	cursor1, err := db.Aggregate(model.Test{}.GetCollectionName(), filter, &opts)
	if err = cursor1.All(context.TODO(), &answerRight); err != nil {
		log.Fatal(err)
	}

	fmt.Println(answerRight)
	//cursor2, err := db.Update(model.Test{}.GetCollectionName(), filter, &opts)
	//if err = cursor2.All(context.TODO(), &tests); err != nil {
	//	log.Fatal(err)
	//}

	return tests
	//{ $match: { _id: ObjectId("607e8a8438cd365f6e5083ec") }},
	//{ $lookup: {
	//from: "questions",
	//	localField: "questions",
	//		foreignField: "_id",
	//		as: "questionDetails"
	//} },
	//{$unwind: "$questionDetails"},
	//{$unwind: "$questionDetails.answers"},
	//{$replaceRoot: {newRoot:"$questionDetails.answers"}},
	//{$match: {
	//	_id: {$in: [ObjectId("607f1299058bccf4cffce5b7"), ObjectId("607f12b2a1d2c739abcc2f11")]}
	//}}
}
