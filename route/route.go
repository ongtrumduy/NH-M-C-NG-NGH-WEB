package route

import (
	"web/controller"
	"web/controller/question"
	"web/controller/test"
	"web/routefw"
)

type MyRoute struct{
	name 		string
	path 		string
	method		string
	handler     func(c *routefw.Context)
}

func NewRouter() *routefw.Route{
	r := routefw.NewRoute()
	addRoute(r)
	return r
}


func addRoute(r *routefw.Route) *routefw.Route{
	for _, route := range routers{
		switch route.method {
		case "post":
			r.Post(route.path, route.handler)
		case "get":
			r.Get(route.path, route.handler)
		case "delete":
			r.Delete(route.path, route.handler)
		}
	}
	return r
}

var routers = []MyRoute{
	{
		name:    "hello",
		path:    "/hello/",
		method:  "get",
		handler: controller.Hello,
	},
	{
		name:    "creation_question",
		path:    "/questions/",
		method:  "post",
		handler: question.CreateQuestionController,
	},
	{
		name:    "get_question_by_testId",
		path:    "/tests/:testId/questions/",
		method:  "get",
		handler: question.GetPaginateQuestionByTestIdController,
	},
	//{
	//	name:    "get_test_by_id",
	//	path:    "/tests/:id/",
	//	method:  "get",
	//	handler: test.GetTestByIdController,
	//},
	{
		name:    "get_paginate_test",
		path:    "/tests/",
		method:  "get",
		handler: test.GetPaginateTestCotroller,
	},
	{
		name:    "register",
		path:    "/register/",
		method:  "post",
		handler: controller.Register,
	},
	{
		name:    "login",
		path:    "/login/",
		method:  "post",
		handler: controller.Login,
	},
	{
		name:    "logout",
		path:    "/logout/",
		method:  "post",
		handler: controller.Logout,
	},
	{
		name: 	"evaluateTest",
		path:  	"/tests/:id/evaluate",
		method: "post",
		handler: test.EvaluateTestController,
	},
	{
		name: 	"get full name",
		path:  	"/getfullname/",
		method: "post",
		handler: controller.GetFullName,
	},
	{
		name: 	"create new Excercise content",
		path:  	"/createnewexcercisecontent/",
		method: "post",
		handler: controller.CreateNewExerciseContent,
	},
	{
		name: 	"update Excercise qa content",
		path:  	"/updateexcerciseqa/",
		method: "post",
		handler: controller.UpdateExcerciseQA,
	},
	{
		name: 	"get all exercises",
		path:  	"/getAllExercise/",
		method: "get",
		handler: controller.GetAllExercises,
	},
}


