package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

var db = dynamodb.New(session.New(), aws.NewConfig().WithRegion("ap-northeast-2"))

func getItem(authorID string) (*petition, error) {
	// Prepare the input for the query.
	input := &dynamodb.GetItemInput{
		TableName: aws.String("support-station"),
		Key: map[string]*dynamodb.AttributeValue{
			"AuthorID": {
				S: aws.String(authorID),
			},
		},
	}

	result, err := db.GetItem(input)
	if err != nil {
		return nil, err
	}
	if result.Item == nil {
		return nil, nil
	}

	// The result.Item object returned has the underlying type
	// map[string]*AttributeValue. We can use the UnmarshalMap helper
	// to parse this straight into the fields of a struct. Note:
	// UnmarshalListOfMaps also exists if you are working with multiple
	// items.
	pt := new(petition)
	err = dynamodbattribute.UnmarshalMap(result.Item, pt)
	
	if err != nil {
		return nil, err
	}

	return pt, nil
}

func putItem(p *petition) error {
	input := &dynamodb.PutItemInput{
		TableName: aws.String("support-station"),
		Item: map[string]*dynamodb.AttributeValue{
			"AuthorID": {
				S: aws.String(p.AuthorID),
			},
			"Title": {
				S: aws.String(p.Title),
			},
			"Content": {
				S: aws.String(p.Content),
			},
		},
	}

	_, err := db.PutItem(input)
	return err
}
