package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Test struct {
	Title string					`json:"title"`
	Questions[] primitive.ObjectID  `bson:"questions,omitempty" json:"questions"`
	Results[] Result				`json:"results"`
	Level string					`json:"level"`
}

type Result struct {
	User User						`json:"user"`
	Score int						`json:"score"`
}

func(t Test) GetCollectionName() (s string) {
	return "tests"
}