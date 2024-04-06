package api

import (
	"net/http"
)

func (a *Api) setupRoutes(mux *http.ServeMux) {
	api := http.NewServeMux()
	record := http.NewServeMux()
	employee := http.NewServeMux()

	api.HandleFunc("GET /employees", a.GetEmployees)
	employee.HandleFunc("POST /", a.AddEmployee)
	employee.HandleFunc("GET /{dni}", a.GetEmployeeByDni)
	employee.HandleFunc("PUT /{dni}", a.EditEmployee)
	employee.HandleFunc("DELETE /{dni}", a.RemoveEmployee)

	api.HandleFunc("GET /records", a.GetRecordsWithEmployees)
	api.HandleFunc("GET /leaked_records", a.GetRecordsWithEmployeesByDateRange)
	record.HandleFunc("POST /", a.AddRecord)
	record.HandleFunc("DELETE /{id}", a.RemoveRecord)

	mux.Handle("/api/", http.StripPrefix("/api", api))
	mux.Handle("/api/employee/", http.StripPrefix("/api/employee", employee))
	mux.Handle("/api/record/", http.StripPrefix("/api/record", record))
}
