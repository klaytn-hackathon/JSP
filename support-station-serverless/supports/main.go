package main

import (
	"supports/db"
	"supports/models"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

func router(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch req.HTTPMethod {
	case "GET":
		return index(req)
	case "POST":
		return create(req)
	case "PATCH":
		return update(req)
	default:
		return clientError(http.StatusMethodNotAllowed)
	}
}

func index(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	supports, err := db.GetItems(&req.QueryStringParameters)
	if err != nil {
		return serverError(err)
	}

	totalCount, err := db.GetTotalCount()

	supportsObj := map[string]interface{}{}
	supportsObj["supports"] = supports
	supportsObj["meta"] = models.Meta{TotalCount: totalCount}

	finalized, err := json.Marshal(supportsObj)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers:    headers(),
		Body:       string(finalized),
	}, nil
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	pt := new(models.Support)
	err := json.Unmarshal([]byte(req.Body), pt)
	if err != nil {
		errorLogger.Fatalln(err)
		return clientError(http.StatusUnprocessableEntity)
	}

	support, dbErr := db.PutItem(pt)
	if dbErr != nil {
		return serverError(dbErr)
	}

	supportJSON, err := json.Marshal(support)
	if err != nil {
		return serverError(err)
	}
	
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusCreated,
		Headers:    headers(),
		Body: string(supportJSON),
	}, nil
}

func update(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	sp := new(models.Support)
	err := json.Unmarshal([]byte(req.Body), sp)
	if err != nil {
		errorLogger.Fatalln(err)
		return clientError(http.StatusUnprocessableEntity)
	}

	if err != nil {
		errorLogger.Fatalln(err)
		return clientError(http.StatusNotFound)
	}

	dbErr := db.UpdateItem(sp)
	if dbErr != nil {
		return serverError(dbErr)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 204,
		Headers:    headers(),
	}, nil
}

func serverError(err error) (events.APIGatewayProxyResponse, error) {
	errorLogger.Println(err.Error())

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Headers:    headers(),
		Body:       err.Error(),
	}, nil
}

func clientError(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Headers:    headers(),
		Body:       http.StatusText(status),
	}, nil
}

func headers() map[string]string {
	return map[string]string{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true"}
}

func main() {
	lambda.Start(router)
}
