package repository

import (
	"context"
	"fmt"
	"time"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

const (
	qryInsertRecordNamed string = `INSERT INTO record(created_at, employee_dni) VALUES (:created_at, :employee_dni);`
	qrySelectRecords     string = `SELECT r.*, e.surname, e.second_surname, e.names, e.position FROM record r JOIN employee e ON r.employee_dni = e.dni ORDER BY r.created_at DESC;`

	qrySelectRecordByDateRange string = `SELECT r.*, e.surname, e.second_surname, e.names, e.position FROM record r JOIN employee e ON r.employee_dni = e.dni WHERE created_at BETWEEN $1 AND $2;`
	// qryUpdateRecordNamed string = `UPDATE record SET created_at=:created_at, employee_dni=:employee_dni WHERE id=:id;`
	qryDeleteRecordNamed string = `DELETE FROM record WHERE id=$1;`
)

func (r *Repo) InsertRecord(ctx context.Context, record *models.Record) error {
	_, err := r.db.NamedExecContext(ctx, qryInsertRecordNamed, record)
	if err != nil {
		fmt.Println("error en InsertRecord")
		return err
	}
	return nil
}

func (r *Repo) SelectRecordsWithEmployees(ctx context.Context) ([]models.RecordWithEmployee, error) {
	records := []models.RecordWithEmployee{}
	err := r.db.SelectContext(ctx, &records, qrySelectRecords)
	if err != nil {
		return nil, err
	}
	return records, nil
}
func (r *Repo) SelectRecordsWithEmployeesByDateRange(ctx context.Context, startTime, endTime time.Time) ([]models.RecordWithEmployee, error) {
	records := []models.RecordWithEmployee{}
	err := r.db.SelectContext(ctx, &records, qrySelectRecordByDateRange, startTime, endTime)
	if err != nil {
		return nil, err
	}
	return records, nil
}

// func (r *Repo) UpdateRecord(ctx context.Context, record *models.Record) error {
// 	_, err := r.db.NamedExecContext(ctx, qryUpdateRecordNamed, record)
// 	if err != nil {
// 		fmt.Println("error en UpdateRecord")
// 		return err
// 	}
// 	return nil
// }

func (r *Repo) DeleteRecord(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, qryDeleteRecordNamed, id)
	if err != nil {
		fmt.Println("error en DeleteRecord")
		return err
	}
	return nil
}
