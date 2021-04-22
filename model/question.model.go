package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Question struct {
	Title string
	Answers[] Answer


}

type Answer struct {
	ID primitive.ObjectID 	`bson:"_id" json:"id,omitempty"`
	IsCorrect bool
	Title string
}

func(q Question) GetName() (s string) {
	return "questions"
}

