package util

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
	"web/db"
	"web/model"
)

var(

)

func CreateToken(userId primitive.ObjectID)(*model.TokenDetails,  error){
	tdAccessUuid := uuid.NewV4().String()
	td := &model.TokenDetails{
		AccessUuid:   tdAccessUuid,
		RefreshUuid:  tdAccessUuid + "++" +userId.String(),
		AtExpires:    time.Now().Add(time.Hour).Unix(),
		RtExpires:    time.Now().Add(time.Hour*24*7).Unix(),
	}

	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["access_uuid"] = td.AccessUuid
	atClaims["user_id"] = userId
	atClaims["exp"] = td.AtExpires
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	accessToken, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil{
		return nil, err
	}
	td.AccessToken = accessToken
	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_uuid"] = td.RefreshUuid
	rtClaims["user_id"] = td.RtExpires
	rtClaims["exp"] = td.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	refreshToken, err := rt.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil{
		return nil, err
	}
	td.RefreshToken = refreshToken
	return td, nil
}

func CreateAuth(userId primitive.ObjectID, details *model.TokenDetails) error{
	now := time.Now()
	//db.InsertOne("exam", "token_accessuuid", strconv.Itoa(userId))
	access := model.AccessToken{
		UserId:     userId,
		AccessUuid: details.AccessUuid,
		CreateAt:   now.String(),
	}
	err := db.InsertOne( "AccessToken", access)
	if err != nil{
		return err
	}
	refresh := model.RefreshToken{
		UserID:      userId,
		RefreshUuid: details.RefreshUuid,
		CreateAt:    now.String(),
	}
	err = db.InsertOne("RefreshToekn", refresh)
	return err
}