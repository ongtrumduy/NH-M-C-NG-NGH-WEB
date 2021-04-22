package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Test struct {
	Title string
	Questions[] primitive.ObjectID  `bson:"questions,omitempty"`
	Results[] Result
	Level string
}

type Result struct {
	User User
	Score int
}

func(t Test) GetName() (s string) {
	return "tests"
}




