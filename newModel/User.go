package newModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID 						primitive.ObjectID		`json:"id" bson:"_id, omitempty"`
	UserName 				string 					`json:"UserName" bson:"UserName"`
	PassWord 				string 					`json:"PassWord" bson:"PassWord"`
	Firstname				string					`json:"Firstname" bson:"Firstname"`
	Lastname				string					`json:"Lastname" bson:"Lastname"`
	PhoneNumber				string					`json:"PhoneNumber" bson:"PhoneNumber"`
	Birthday				string					`json:"Birthday" bson:"Birthday"`
	Gender					string					`json:"Gender" bson:"Gender"`
}
