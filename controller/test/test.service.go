package test

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func CreateTest(data *model.Test) (a model.Test) {
	var test = model.Test{}

	testDate := model.Test{
		Title: data.Title,
		Description: data.Description,
		NumberOfQuestion: data.NumberOfQuestion,
		Type: data.Type,
		Logo: data.Logo,
	}

	testResult, _ := db.InsertOne(test.GetCollectionName(), testDate)
	testId := testResult.InsertedID.(primitive.ObjectID).String()
	test = GetTestById(testId)

	return test
}

func EvaluateTest(testId string, userId string, answers []string) (a model.Test)  {
	var test =  model.Test{}
	var answerRight = [] model.Answer{}
	var result = model.Result{}

	testIdObjectId, _ := primitive.ObjectIDFromHex(testId)
	answerIds := make([]primitive.ObjectID, len(answers))

	for i:=0; i < len(answers); i++ {
		id, _ := primitive.ObjectIDFromHex(answers[i])
		answerIds[i] = id
	}
	matchStage1 := bson.D{{ "$match", bson.D{{ "_id", testIdObjectId }} }}
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
	matchStage2 := bson.D{{ "$match", bson.D{{ "_id", bson.D{{ "$in", answerIds }} }} }}

	filter := mongo.Pipeline{matchStage1, lookupStage, unwindStage1, unwindStage2, replaceRootStage, matchStage2}

	opts := options.AggregateOptions{
	}

	cursor1, err := db.Aggregate(model.Test{}.GetCollectionName(), filter, &opts)
	if err = cursor1.All(context.TODO(), &answerRight); err != nil {
		log.Fatal(err)
	}

	result.Users, err = primitive.ObjectIDFromHex(userId)
	result.Score = len(answerRight)*10
	filter2 := bson.D{{ "_id", testIdObjectId }}
	update := bson.D{{ "$push", bson.D{{ "results", result }} }}
	opts2 := options.UpdateOptions{}
	fmt.Println("result", filter2, update)
	_, err1 := db.UpdateOne(model.Test{}.GetCollectionName(), filter2, update, &opts2)
	if err1 != nil {
		log.Fatal("777",err1)
	}

	test = GetTestById(testId)
	return test
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

//{ $match: { _id: ObjectId("607e8a8438cd365f6e5083ec") }},
//
//{$unwind: "$results"},
//{$replaceRoot: {newRoot:"$results"}},
//{$sort: {"score":-1}}

func UpdateTest(testId string, questions []primitive.ObjectID) {
	filter2 := bson.D{{ "_id", testId }}
	update := bson.D{{ "$set", bson.D{{ "questions", questions }} }}
	opts2 := options.UpdateOptions{}
	_, err1 := db.UpdateOne(model.Test{}.GetCollectionName(), filter2, update, &opts2)
	if err1 != nil {
		log.Fatal("777",err1)
	}
}