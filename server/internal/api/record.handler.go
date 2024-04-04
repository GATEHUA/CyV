package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	models "github.com/GATEHUA/CyV/server/internal/model"
)

func (a *Api) GetRecordsWithEmployees(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	records, err := a.serv.GetRecordsWithEmployees(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(records)
}

func (a *Api) AddRecord(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	record := new(models.Record)
	err := json.NewDecoder(r.Body).Decode(record)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.serv.AddRecord(ctx, record)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (a *Api) RemoveRecord(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.serv.RemoveRecord(ctx, idInt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (a *Api) GetRecordsWithEmployeesByDateRange(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	// Parsear los parámetros de consulta
	startTimeStr := r.URL.Query().Get("start_time")
	endTimeStr := r.URL.Query().Get("end_time")

	// Convertir las cadenas a time.Time
	startTime, err := time.Parse(time.RFC3339, startTimeStr)
	if err != nil {
		http.Error(w, "Invalid start_time", http.StatusBadRequest)
		return
	}
	endTime, err := time.Parse(time.RFC3339, endTimeStr)
	if err != nil {
		http.Error(w, "Invalid end_time", http.StatusBadRequest)
		return
	}

	records, err := a.serv.GetRecordsWithEmployeesByDateRange(ctx, startTime, endTime)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(records)
}
