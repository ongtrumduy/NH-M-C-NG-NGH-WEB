package util

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"os"
	"strings"
	"time"
	"web/db"
	"web/model"
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

func CreateAuth(userId string, details *model.TokenDetails) error{
	now := time.Now()
	//db.InsertOne("exam", "token_accessuuid", strconv.Itoa(userId))
	access := model.AccessToken{
		UserId:     userId,
		AccessUuid: details.AccessUuid,
		CreateAt:   now.String(),
	}
	_, err := db.InsertOne( "AccessToken", access)
	if err != nil{
		return err
	}
	refresh := model.RefreshToken{
		UserID:      userId,
		RefreshUuid: details.RefreshUuid,
		CreateAt:    now.String(),
	}
	_, err = db.InsertOne("RefreshToken", refresh)
	return err
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func VerifyToken(r *http.Request) (*jwt.Token, error) {
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func ExtractTokenMetadata(r *http.Request) (*model.AccessToken, error) {
	token, err := VerifyToken(r)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	fmt.Println("claims  ",claims)
	if ok && token.Valid {
		accessUuid, ok := claims["access_uuid"].(string)
		if !ok {
			return nil, err
		}
		//userId, err :=
		if err != nil {
			return nil, err
		}
		return &model.AccessToken{
			AccessUuid: accessUuid,
			UserId:   claims["access_uuid"].(string),
		}, nil
	}
	return nil, err
}

func DeleteTokens(token *model.AccessToken) error{
	filter := bson.D{
		{
			"user_id", token.UserId,
		},
		{
			"access_uuid", token.AccessUuid,
		},
	}
	err := db.DeleteOne("AccessToken", filter)
	if err != nil{
		return err
	}
	filter = bson.D{
		{
			"user_id", token.UserId,
		},
		{
			"refresh_uuid", token.AccessUuid + "++" + token.UserId,
		},
	}
	err = db.DeleteOne("RefreshToken", filter)
	return err
}

