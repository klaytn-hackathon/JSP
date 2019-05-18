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
	SupportLimitCount uint      `json:"support_limit_count"`
	EndDate           time.Time `json:"end_date"`

	SupportCount uint `json:"support_count,omitempty"`
}
