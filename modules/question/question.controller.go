package question

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"web/db"
	"web/model"
	"web/modules/test"
)

func GetPaginateQuestionByTestId (testId string, page int64, perPage int64) (a []model.Question) {
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
	opts := options.FindOptions{
		Skip: &skip,
		Limit: &perPage,
	}

	// query
	cursor, err := db.Find(question.GetName(), filter, &opts)
	if err = cursor.All(context.TODO(), &questions); err != nil {
		log.Fatal(err)
	}

	return questions
}

func CreateQuestion() {
	ans1 := model.Answer{
		ID: primitive.NewObjectID(),
		IsCorrect: false,
		Title: "1",
	}
	ans2 := model.Answer{
		ID: primitive.NewObjectID(),
		IsCorrect: true,
		Title: "2",
	}
	var ans []model.Answer
	ans = append(ans, ans1, ans2)

	questionModel := model.Question{
		Title:         	"question1",
		Answers: 		ans,
	}
	db.InsertOne("exam", "questions", questionModel)

	filter := bson.D{{}}
	_, err := db.Find(questionModel.GetName(), filter)
	if err != nil {
		fmt.Println(err)
	}
}