package main

import (
	"fmt"
	"web/db"
	"web/model"
)

func main(){
	user := model.User{
		//ID:       primitive.ObjectID{},
		UserName: "dung",
		PassWord: "111",
		Email:    "dung@gmail.com",
	}
	db.InsertOne("web", "user",user)
	a := db.FindOneByValue("web", "user", "UserName", "dung")
	//u := &model.User{}

	bson, err := a.DecodeBytes()
	if err != nil{
		fmt.Println(err)

	}
	fmt.Println(bson)

}
