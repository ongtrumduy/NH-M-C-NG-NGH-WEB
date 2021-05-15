package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type TokenDetails struct {
	AccessToken  		string	 		`json:"access_token" bson:"access_token"`
	RefreshToken 		string 			`json:"refresh_token" bson:"refresh_token"`
	AccessUuid   		string 			`json:"access_uuid" bson:"access_uuid"`
	RefreshUuid  		string 			`json:"refresh_uuid" bson:"refresh_uuid"`
	AtExpires    		int64 			`json:"at_expires" bson:"at_expires"`
	RtExpires    		int64 			`json:"rt_expires" bson:"rt_expires"`
	//CreateAt			string			`json:"create_at" bson:"create_at"`
}

type AccessDetails struct {
	AccessUuid string
	UserId   uint64
}

type AccessToken struct {
	UserId 				primitive.ObjectID			`json:"user_id" bson:"user_id"`
	AccessUuid			string						`json:"access_uuid" bson:"access_uuid"`
	CreateAt			string						`json:"create_at" bson:"create_at"`
}

type RefreshToken struct {
	UserID				primitive.ObjectID			`json:"user_id" bson:"user_id"`
	RefreshUuid			string						`json:"refresh_uuid" bson:"refresh_uuid"`
	CreateAt			string						`json:"create_at" bson:"create_at"`
}