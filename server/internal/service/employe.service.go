package service

import (
	"context"
	"errors"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

var (
	ErrEmployeeAlreadyExists = errors.New("el dni ya existe")
	ErrEmployeeNotFound      = errors.New("empleado no encontrado")
)

func (s *Serv) AddEmployee(ctx context.Context, employee *models.Employee) error {
	e, _ := s.repo.SelectEmployeeByDni(ctx, employee.Dni)
	if e != nil {
		return ErrEmployeeAlreadyExists
	}
	return s.repo.InsertEmployee(ctx, employee)
}

func (s *Serv) EditEmployee(ctx context.Context, employee *models.Employee, whereDni string) error {
	e, _ := s.repo.SelectEmployeeByDni(ctx, employee.Dni)
	if e != nil {
		return ErrEmployeeAlreadyExists
	}
	return s.repo.UpdateEmployee(ctx, employee, whereDni)
}

func (s *Serv) RemoveEmployee(ctx context.Context, dni string) error {
	return s.repo.DeleteEmployee(ctx, dni)
}

func (s *Serv) GetEmployeeByDni(ctx context.Context, dni string) (*models.Employee, error) {
	e, err := s.repo.SelectEmployeeByDni(ctx, dni)
	if err != nil {
		return nil, ErrEmployeeNotFound
	}
	return e, nil
}

func (s *Serv) GetEmployees(ctx context.Context) ([]models.Employee, error) {
	return s.repo.SelectEmployees(ctx)
}
