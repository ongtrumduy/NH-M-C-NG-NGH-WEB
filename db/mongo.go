package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

var (
	MongoClient *mongo.Client
	CTX context.Context
)

func init(){
	Client, err := mongo.NewClient(options.Client().ApplyURI("mongo://localhost:27017"))
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

func FindById(databaseName string, collectionName string){
	collection := Client().Database(databaseName).Collection(collectionName)
	collection.FindOne()
}

