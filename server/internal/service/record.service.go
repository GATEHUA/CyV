package service

import (
	"context"
	"time"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

func (s *Serv) AddRecord(ctx context.Context, record *models.Record) error {
	return s.repo.InsertRecord(ctx, record)
}

func (s *Serv) GetRecordsWithEmployees(ctx context.Context) ([]models.RecordWithEmployee, error) {
	return s.repo.SelectRecordsWithEmployees(ctx)
}

func (s *Serv) RemoveRecord(ctx context.Context, id int64) error {
	return s.repo.DeleteRecord(ctx, id)
}

func (s *Serv) GetRecordsWithEmployeesByDateRange(ctx context.Context, startTime, endTime time.Time) ([]models.RecordWithEmployee, error) {
	return s.repo.SelectRecordsWithEmployeesByDateRange(ctx, startTime, endTime)
}
