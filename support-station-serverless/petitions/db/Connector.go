package db

import (
	"fmt"
	"os"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type DBConnector struct {
}

func (p *DBConnector) getConnection() (db *gorm.DB, err error) {
	username := os.Getenv("db_user")
	password := os.Getenv("db_pass")
	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")
	dbURI := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, dbHost, dbName)

	return gorm.Open("mysql", dbURI)
}

// GetConnection returns a DB session.
func GetConnection() (db *gorm.DB, err error) {
	dbConnector := DBConnector{}
	db2, err := dbConnector.getConnection()

	return db2, err
}
