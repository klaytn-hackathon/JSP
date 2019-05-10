package db

import (
	"fmt"
	"petitions/models"
	"time"

	"github.com/jinzhu/gorm"
)

func GetItems(queryString *map[string]string) ([]models.Petition, error) {
	db, err := getConnection()
	defer db.Close()

	if err != nil {
		fmt.Printf(err.Error())
		return nil, err
	}

	if (*queryString)["order"] != "" {
		db = db.Order((*queryString)["order"] + " desc")
	}

	if (*queryString)["offset"] != "" {
		db = db.Offset((*queryString)["offset"])
	}

	petitions := []models.Petition{}
	if (*queryString)["limit"] == "" {
		db.Find(&petitions)
	} else {
		db.Limit((*queryString)["limit"]).Find(&petitions)
	}



	return petitions, nil
}

func GetTotalCount() (uint, error) {
	db, err := getConnection()
	defer db.Close()

	if err != nil {
		fmt.Printf(err.Error())
		return 0, err
	}

	count := (uint)(0)
	db.Table("petitions").Count(&count)

	return count, nil
}

// func getItem(authorID string) (*models.Petition, error) {
// 	dbConnector := DBConnector{}
// 	db, err := dbConnector.GetConnection()
// 	defer db.Close()
// }

func PutItem(petition *models.Petition) error {
	db, err := getConnection()
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

func getConnection() (db *gorm.DB, err error) {
	dbConnector := DBConnector{}
	db2, err := dbConnector.GetConnection()

	return db2, err
}
