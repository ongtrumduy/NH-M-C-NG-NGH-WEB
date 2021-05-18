package main

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"web/db"
	"web/newModel"
)

func main(){
	col := db.Client().Database("exam").Collection("Excercise")
	//findOptions := options.Find()

	cursor, err  := col.Find(db.CTX, bson.D{})
	if err != nil{
		fmt.Println("err ", err)
		return
	}

	exercise := []newModel.Excercise{}
//	err = cursor.All(db.CTX,&exercise)
//	if err != nil{
//		fmt.Println("err",  err)
//	}
//	fmt.Println(exercise)
//	//a(exercise)
//	x := newModel.Excercise{}
//	a(x)
	cursor.Decode(&exercise)
	fmt.Println(exercise)
}

func a(x interface{}){
	fmt.Println(x)
}