package models

import (
	"time"
)

type Record struct {
	Id          int64     `db:"id" json:"id"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	EmployeeDni string    `db:"employee_dni" json:"employee_dni"`
}

// type RecordWithEmployee struct {
// 	ID            int64     `db:"id"`
// 	CreatedAt     time.Time `db:"created_at"`
// 	EmployeeDni   string    `db:"employee_dni"`
// 	Surname       string    `db:"surname"`
// 	SecondSurname string    `db:"second_surname"`
// 	Names         string    `db:"names"`
// 	Position      string    `db:"position"`
// }

type RecordWithEmployee struct {
	Record
	Surname       string `db:"surname" json:"surname"`
	SecondSurname string `db:"second_surname" json:"second_surname"`
	Names         string `db:"names" json:"names"`
	Position      string `db:"position" json:"position"`
	// Employee
}
