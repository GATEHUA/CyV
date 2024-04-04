package models

import "time"

type Employee struct {
	Dni           string    `db:"dni" json:"dni,omitempty"`
	Surname       string    `db:"surname" json:"surname"`
	SecondSurname string    `db:"second_surname" json:"second_surname"`
	Names         string    `db:"names" json:"names"`
	Position      string    `db:"position" json:"position"`
	CreatedAt     time.Time `db:"created_at" json:"created_at,omitempty"`
}
