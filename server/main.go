package main

import (
	"context"

	"github.com/GATEHUA/CyV/server/database"
	"github.com/GATEHUA/CyV/server/internal/api"
	"github.com/GATEHUA/CyV/server/internal/repository"
	"github.com/GATEHUA/CyV/server/internal/service"
	"github.com/GATEHUA/CyV/server/setting"
)

func main() {
	ctx := context.Background()
	s, err := setting.Loadsetting()
	if err != nil {
		panic(err)
	}
	db, err := database.New(ctx, s)
	if err != nil {
		panic(err)
	}
	repo := repository.New(db)

	// x, err := repo.SelectRecordsWithEmployees(ctx)
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(x)
	serv := service.New(repo)
	app := api.New(serv)
	err = app.Start(s)
	if err != nil {
		panic(err)
	}

}
