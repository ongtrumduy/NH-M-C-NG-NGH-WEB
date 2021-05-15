package main

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"web/db"
	"web/model"
)

func main(){
	//u1 := model.User{
	//	UserName: "dung",
	//	PassWord: "123456",
	//	Email:    "dung@gmail.com",
	//}
	//
	//u2 := model.User{
	//	UserName: "user1",
	//	PassWord: "123456",
	//	Email:    "user1@gamil.com",
	//}
	//db.InsertOne("exam", "user", u1)
	//db.InsertOne("exam", "user", u2)

	//db.Find("exam", bson.D{{"user_name", "dung"}})
	//u := model.User{}
	rs := db.FindOne("user", bson.D{{"user_name", "dung"}})
	user := &model.User{}
	err := rs.Decode(user)
	if err != nil{
		fmt.Println("err ", err)

	}
	fmt.Println(user)
}