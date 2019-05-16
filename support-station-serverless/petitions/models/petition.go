package models

import (
	"time"
)

// Petition Model
type Petition struct {
	model

	ID                uint      `json:"id"`
	AuthorID          string    `json:"author_id"`
	Title             string    `json:"title"`
	Content           string    `json:"content"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"-"`
	SupportCount      uint      `json:"support_count"`
	SupportLimitCount uint      `json:"support_limit_count"`
	EndDate           time.Time `json:"end_date"`
}
