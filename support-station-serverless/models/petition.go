package models

import (
	"reflect"
	"time"
)

type Petition struct {
	ID           uint      `json:"id"`
	AuthorID     string    `json:"author_id"`
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"-"`
	SupportCount uint      `json:"support_count"`
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
