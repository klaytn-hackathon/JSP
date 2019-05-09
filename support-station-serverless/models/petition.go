package models

import (
	"reflect"

	"github.com/jinzhu/gorm"
)

type Petition struct {
	gorm.Model
	AuthorID     string `json:"author_id"`
	Title        string `json:"title"`
	Content      string `json:"content"`
}

func (p *Petition) Values() []string {
	val := reflect.ValueOf(p).Elem()

	petitionValues := []string{}
	for i := 0; i < val.NumField(); i++ {
		valueField := val.Field(i)
		petitionValues = append(petitionValues, valueField.Interface().(string))
	}

	return petitionValues
}
