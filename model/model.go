package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID primitive.ObjectID
	UserName string
	PassWord string
	Email string
}

