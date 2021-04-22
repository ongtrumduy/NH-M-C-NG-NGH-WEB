package db

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

var (
	MongoClient *mongo.Client
	CTX context.Context
	DB_NAME string
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


	// Get Database name
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	DB_NAME = os.Getenv("DB_NAME")
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
	fmt.Println(data)
	return
}

func InsertMany(databaseName string, collectionName string, data []interface{})(err error){
	collection := Client().Database(databaseName).Collection(collectionName)
	_, err = collection.InsertMany(CTX, data)
	return
}



//func test2(db string, collection string, fitter bson.M){
//	opts := options.Find().SetLI
//
//}

func Find(collectionName string, filter interface{}, opts ...*options.FindOptions) (a *mongo.Cursor, err error){
	collection := Client().Database(DB_NAME).Collection(collectionName)
	cursor, err := collection.Find(CTX, filter, opts...)

	if err != nil {
		log.Fatal(err)
	}

	return cursor, err
}

func FindById(collectionName string, id string, opts ...*options.FindOneOptions) (a *mongo.SingleResult){
	fmt.Println(DB_NAME)
	collection := Client().Database(DB_NAME).Collection(collectionName)
	docID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Println(err)
	}
	filter := bson.D{{ "_id", docID }}
	cursor := collection.FindOne(CTX, filter, opts...)

	return cursor
}




