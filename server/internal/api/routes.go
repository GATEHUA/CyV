package api

import (
	"net/http"
)

func (a *Api) setupRoutes(mux *http.ServeMux) {
	api := http.NewServeMux()
	// record := http.NewServeMux()
	// employee := http.NewServeMux()

	api.HandleFunc("GET /employees", a.GetEmployees)
	api.HandleFunc("POST /employee", a.AddEmployee)
	api.HandleFunc("GET employee/{dni}", a.GetEmployeeByDni)
	api.HandleFunc("PUT /employee/{dni}", a.EditEmployee)
	api.HandleFunc("DELETE /employee/{dni}", a.RemoveEmployee)

	// employee.HandleFunc("POST /", a.AddEmployee)
	// employee.HandleFunc("GET /{dni}", a.GetEmployeeByDni)
	// employee.HandleFunc("PUT /{dni}", a.EditEmployee)
	// employee.HandleFunc("DELETE /{dni}", a.RemoveEmployee)

	api.HandleFunc("GET /records", a.GetRecordsWithEmployees)
	api.HandleFunc("GET /leaked_records", a.GetRecordsWithEmployeesByDateRange)
	api.HandleFunc("POST /record", a.AddRecord)
	api.HandleFunc("DELETE /record/{id}", a.RemoveRecord)

	// record.HandleFunc("POST /", a.AddRecord)
	// record.HandleFunc("DELETE /{id}", a.RemoveRecord)

	mux.Handle("/api/", http.StripPrefix("/api", api))
	// mux.Handle("/api/employee/", http.StripPrefix("/api/employee", employee))
	// mux.Handle("/api/record/", http.StripPrefix("/api/record", record))
}
