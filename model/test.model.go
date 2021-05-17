package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Test struct {
	Title string					`json:"title"`
	Description string				`json:"description"`
	NumberOfQuestion int32			`json:"numberOfQuestion"`
	Questions[] primitive.ObjectID  `bson:"questions,omitempty" json:"questions"`
	Results[] Result				`json:"results"`
	Type string						`json:"type"`
	Logo string						`json:"logo"`
}

type Result struct {
	Users primitive.ObjectID		`bson:"users,omitempty" json:"users"`
	Score int						`json:"score"`
}

func(t Test) GetCollectionName() (s string) {
	return "tests"
}