package api

import (
	"encoding/json"
	"net/http"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

func (a *Api) AddEmployee(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	employee := new(models.Employee)
	err := json.NewDecoder(r.Body).Decode(employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.serv.AddEmployee(ctx, employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (a *Api) EditEmployee(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	employee := new(models.Employee)

	whereDni := r.PathValue("dni")

	err := json.NewDecoder(r.Body).Decode(employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.serv.EditEmployee(ctx, employee, whereDni)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (a *Api) RemoveEmployee(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	dni := r.PathValue("dni")
	err := a.serv.RemoveEmployee(ctx, dni)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (a *Api) GetEmployeeByDni(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	dni := r.PathValue("dni")
	employee, err := a.serv.GetEmployeeByDni(ctx, dni)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(employee)
}

func (a *Api) GetEmployees(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	employees, err := a.serv.GetEmployees(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(employees)
}
