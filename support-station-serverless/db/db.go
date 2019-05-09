package db

import (
	"time"
	"fmt"
	"petitions/models"
)

// func getItems(queryString *map[string]string) ([]petition, error) {

// }

// func getItem(authorID string) (*models.Petition, error) {
// 	dbConnector := DBConnector{}
// 	db, err := dbConnector.GetConnection()
// 	defer db.Close()
// }

func PutItem(petition *models.Petition) error {
	dbConnector := DBConnector{}
	db, err := dbConnector.GetConnection()
	defer db.Close()
	if err != nil {
		fmt.Printf(err.Error())
		return err
	}

	db.AutoMigrate(&models.Petition{})
	
	petition.CreatedAt = time.Now()
	petition.UpdatedAt = time.Now()

	db.Create(petition)

	return nil
}
