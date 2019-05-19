package models

import (
	"time"
)

// Support Model
type Support struct {
	model

	ID            uint      `json:"id"`
	PetitionID    uint      `json:"petition_id"`
	SignerID      string    `json:"signer_id"`
	TransactionID string    `json:"transaction_id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"-"`
}
