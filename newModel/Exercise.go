package newModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Excercise struct {
	ExcerciseID					primitive.ObjectID		`json:"ExcerciseID,omitempty" bson:"_id,omitempty"`
	ExcerciseName				string					`json:"ExcerciseName" bson:"ExcerciseName"`
	ExcerciseDescription		string					`json:"ExcerciseDescription" bson:"ExcerciseDescription"`
	ExcerciseLogo				string					`json:"ExcerciseLogo" bson:"ExcerciseLogo"`
	//ExcerciseCreateMenberID		string					`json:"ExcerciseCreateMenberID" bson:"ExcerciseCreateMenberID"`
	ExcerciseType				string					`json:"ExcerciseType" bson:"ExcerciseType"`
	ExcerciseNumberQuestion		string					`json:"ExcerciseNumberQuestion" bson:"ExcerciseNumberQuestion"`
	ExcerciseQAContent			[]ExcerciseQAContent	`json:"ExcerciseQAContent" bson:"ExcerciseQAContent"`
}

type ExcerciseQAContent struct {
	ExcerciseNthQuestion		int						`json:"ExcerciseNthQuestion" bson:"ExcerciseNthQuestion"`
	ExcerciseQuestionContent	string					`json:"ExcerciseQuestionContent" bson:"ExcerciseQuestionContent"`
	ExcerciseAnswerContentA		string					`json:"ExcerciseAnswerContentA" bson:"ExcerciseAnswerContentA"`
	ExcerciseAnswerContentB		string					`json:"ExcerciseAnswerContentB" bson:"ExcerciseAnswerContentB"`
	ExcerciseAnswerContentC		string					`json:"ExcerciseAnswerContentC" bson:"ExcerciseAnswerContentC"`
	ExcerciseAnswerContentD		string					`json:"ExcerciseAnswerContentD" bson:"ExcerciseAnswerContentD"`
	ExcerciseCorrectAnswer		string					`json:"ExcerciseCorrectAnswer" bson:"ExcerciseCorrectAnswer"`
}

type UserScore struct {
	Score 		string
	UserId 		string
	TestId		string
}



