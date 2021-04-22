package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Question struct {
	Title string			`json:"title"`
	Answers[] Answer		`json:"answers"`
}

type Answer struct {
	ID primitive.ObjectID 	`bson:"_id" json:"id,omitempty"`
	IsCorrect bool			`json:"is_correct"`
	Title string			`json:"title"`
}

func(q Question) GetCollectionName() (s string) {
	return "questions"
}

