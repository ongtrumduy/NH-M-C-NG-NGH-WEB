package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID primitive.ObjectID	`json:"id" bson:"_id, omitempty"`
	UserName string `json:"user_name" bson:"user_name"`
	PassWord string `json:"pass_word" bson:"pass_word"`
	Email string `json:"email" bson:"email"`
}



