package question

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"web/controller/test"
	"web/db"
	"web/model"
)

func GetPaginateQuestionByTestId (testId string, page int, perPage int) (a []model.Question) {
	testModel := test.GetTestById(testId)

	// Lấy question1 từ test2
	question := model.Question{}
	var questions = [] model.Question{}

	// match id
	filter := bson.D{{
		"_id",
		bson.D{{
			"$in",
			testModel.Questions,
		}},
	}}

	// filter
	skip := int64((page - 1) * perPage)
	limit := int64(perPage)
	opts := options.FindOptions{
		Skip: &skip,
		Limit: &limit,
	}

	// query
	cursor, err := db.Find(question.GetCollectionName(), filter, &opts)
	if err = cursor.All(context.TODO(), &questions); err != nil {
		log.Fatal(err)
	}

	return questions
}

func CreateQuestion(data []model.Question) (results []primitive.ObjectID){
	var questions [] interface{}
	for i := 0; i < len(data); i++ {
		questions[i] = model.Question{
			Title: data[i].Title,
			Answers: data[i].Answers,
		}
	}

	// Tạo các question
	cursor, err := db.InsertMany(model.Question{}.GetCollectionName(), questions)
	if err != nil {
		fmt.Println(err)
	}

	// Lấy mảng các id question vừa tạo
	questionId := cursor.InsertedIDs
	for i := 0; i < len(questionId); i++ {
		results[i] = questionId[i].(primitive.ObjectID)
	}

	return results
}