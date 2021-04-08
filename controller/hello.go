package controller

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
)

func Hello(c *gin.Context){
	var coll *mongo.Collection

	// find all documents in which the "name" field is "Bob"
	// specify the Sort option to sort the returned documents by age in ascending order
	opts := options.Find().SetSort(bson.D{{"age", 1}})
	cursor, err := coll.Find(context.TODO(), bson.D{{"name", "Bob"}}, opts)
	if err != nil {
		log.Fatal(err)
	}

	// get a list of all returned documents and print them out
	// see the mongo.Cursor documentation for more examples of using cursors
	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
	c.JSON(http.StatusOK, "ok")
}