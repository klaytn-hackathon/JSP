package db

import (
	"petitions/models"
	"time"
	"log"
	"os"
)

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

func GetItems(queryString *map[string]string) ([]models.Petition, error) {
	db, err := GetConnection()
	defer db.Close()

	if err != nil {
		errorLogger.Println(err.Error())
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
	db, err := GetConnection()
	defer db.Close()

	if err != nil {
		errorLogger.Println(err.Error())
		return 0, err
	}

	count := (uint)(0)
	db.Table("petitions").Count(&count)

	return count, nil
}

func GetItem(ID string) (*models.Petition, error) {
	db, err := GetConnection()
	defer db.Close()

	if err != nil {
		errorLogger.Println(err.Error())
		return nil, err
	}

	petition := models.Petition{}
	db.First(&petition, ID)

	return &petition, nil
}

func PutItem(petition *models.Petition) (*models.Petition, error) {
	db, err := GetConnection()
	defer db.Close()

	if err != nil {
		errorLogger.Println(err.Error())
		return nil, err
	}

	db.AutoMigrate(&models.Petition{})

	petition.CreatedAt = time.Now()
	petition.UpdatedAt = time.Now()

	db.Create(petition)

	return petition, nil
}
