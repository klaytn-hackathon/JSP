package db

import (
	"log"
	"os"
	"petitions/models"
	"time"
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

	if (*queryString)["with_support_count"] == "true" {
		db = db.
			Select("petitions.id, petitions.author_id, petitions.title, petitions.content, petitions.created_at, petitions.support_limit_count, petitions.end_date, count(supports.id) as support_count").Joins("LEFT JOIN supports ON petitions.id = supports.petition_id").
			Group("petitions.id")
	}

	if (*queryString)["limit"] != "" {
		db = db.Limit((*queryString)["limit"])
	}

	petitions := []models.Petition{}
	db.Find(&petitions)

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

func UpdateItem(petition *models.Petition) error {
	db, err := GetConnection()
	defer db.Close()

	if err != nil {
		errorLogger.Println(err.Error())
		return err
	}

	p := models.Petition{}
	db = db.First(&p, petition.ID)

	p.TransactionID = petition.TransactionID
	db.Save(&p)

	return nil
}