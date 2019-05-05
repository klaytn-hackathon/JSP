package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

type petition struct {
	AuthorID string `json:"author_id" dynamodbav:"AuthorID"`
	Title    string `json:"title" dynamodbav:"Title"`
	Content  string `json:"content" dynamodbav:"Content"`
}

func router(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch req.HTTPMethod {
	case "GET":
		return show(req)
	case "POST":
		return create(req)
	default:
		return clientError(http.StatusMethodNotAllowed)
	}
}

func show(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	authorID := req.QueryStringParameters["author_id"]

	pt, err := getItem(authorID)
	if err != nil {
		return serverError(err)
	}
	if pt == nil {
		return clientError(http.StatusNotFound)
	}

	js, err := json.Marshal(pt)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(js),
	}, nil
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	pt := new(petition)
	err := json.Unmarshal([]byte(req.Body), pt)
	if err != nil {
		return clientError(http.StatusUnprocessableEntity)
	}

	if pt.Title == "" || pt.Content == "" || pt.AuthorID == "" {
		return clientError(http.StatusBadRequest)
	}

	err = putItem(pt)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Headers: map[string]string{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials":"true"},
	}, nil
}

func serverError(err error) (events.APIGatewayProxyResponse, error) {
	errorLogger.Println(err.Error())

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Headers: map[string]string{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials":"true"},
		Body:       http.StatusText(http.StatusInternalServerError),
	}, nil
}

func clientError(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Headers: map[string]string{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials":"true"},
		Body:       http.StatusText(status),
	}, nil
}

func main() {
	lambda.Start(router)
}
