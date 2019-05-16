package models

import (
	"reflect"
)

type model struct {}

func (m *model) Values() []string {
	val := reflect.ValueOf(m).Elem()

	modelValues := []string{}
	for i := 0; i < val.NumField(); i++ {
		valueField := val.Field(i)
		modelValues = append(modelValues, valueField.Interface().(string))
	}

	return modelValues
}
