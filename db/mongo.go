package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

var (
	DBNAME = "web"
	MongoClient *mongo.Client
	CTX context.Context
)

func init(){
	Client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil{
		panic(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = Client.Connect(ctx)
	if err != nil{
		panic(err)
	}
	MongoClient = Client
	CTX = ctx
}

func Client() *mongo.Client{
	err := MongoClient.Ping(context.TODO(), nil)
	if err != nil{
		panic(err)
	}
	return MongoClient
}

func InsertOne(databaseName string, collectionName string, data interface{}) (err error){
	collection := Client().Database(databaseName).Collection(collectionName)
	_, err = collection.InsertOne(CTX, data)
	return
}

func InsertMany(databaseName string, collectionName string, data []interface{})(err error){
	collection := Client().Database(databaseName).Collection(collectionName)
	_, err = collection.InsertMany(CTX, data)
	return
}

func FindOneByValue(databaseName string, collectionName string,name string, value interface{}) (result *mongo.SingleResult){
	collection := Client().Database(databaseName).Collection(collectionName)
	result = collection.FindOne(CTX, bson.M{name: value})
	collection.Find()
	return result
}

//func test(db string, collection string, fitter bson.M){
//	opts := options.Find().SetLI
//
//}

