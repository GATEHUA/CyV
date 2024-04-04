package repository

import (
	"context"
	"fmt"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

const (
	// qryInsertEmployee     string = `INSERT INTO employee(dni, surname, second_surname, names, "position") VALUES ($1, $2, $3, $4, $5);`
	qryInsertEmployeeNamed string = `INSERT INTO employee(dni, surname, second_surname, names, "position") VALUES (:dni, :surname, :second_surname, :names, :position);`
	qrySelectEmployeeByDni string = `SELECT * FROM employee WHERE dni=$1;`
	qrySelectEmployees     string = `SELECT * FROM employee ORDER BY created_at DESC;`
	// qryUpdateEmployee      string = `UPDATE public.employee SET dni=$1, surname=$2, second_surname=$3, names=$4, "position"=$5 WHERE dni=$6;`
	qryUpdateEmployeeNamed string = `UPDATE public.employee SET dni=:dni, surname=:surname, second_surname=:second_surname, names=:names, "position"=:position WHERE dni=:where_dni;`
	qryDeleteEmployee      string = `DELETE FROM employee WHERE dni=$1;`
)

func (r *Repo) InsertEmployee(ctx context.Context, employee *models.Employee) error {
	// _, err := r.db.ExecContext(ctx, qryInsertEmployee, employee.Dni, employee.Surname, employee.SecondSurname, employee.Names, employee.Position)
	_, err := r.db.NamedExecContext(ctx, qryInsertEmployeeNamed, employee)
	if err != nil {
		fmt.Println("error en InsertEmployee")
		return err
	}
	return nil
}

func (r *Repo) SelectEmployeeByDni(ctx context.Context, dni string) (*models.Employee, error) {
	e := new(models.Employee)
	err := r.db.GetContext(ctx, e, qrySelectEmployeeByDni, dni)
	if err != nil {
		return nil, err
	}
	return e, nil
}

func (r *Repo) SelectEmployees(ctx context.Context) ([]models.Employee, error) {
	employees := []models.Employee{}
	err := r.db.SelectContext(ctx, &employees, qrySelectEmployees)
	if err != nil {
		return nil, err
	}
	return employees, nil
}

func (r *Repo) UpdateEmployee(ctx context.Context, employee *models.Employee, whereDni string) error {
	data := struct {
		models.Employee
		WhereDni string `db:"where_dni"`
	}{
		Employee: *employee,
		WhereDni: whereDni,
	}

	_, err := r.db.NamedExecContext(ctx, qryUpdateEmployeeNamed, data)
	if err != nil {
		fmt.Println("error en UpdateEmployee")
		return err
	}
	return nil
}

func (r *Repo) DeleteEmployee(ctx context.Context, dni string) error {
	_, err := r.db.ExecContext(ctx, qryDeleteEmployee, dni)
	if err != nil {
		return err
	}
	return nil
}
