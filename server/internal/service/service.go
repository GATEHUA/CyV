package service

import "github.com/GATEHUA/CyV/server/internal/repository"

type Serv struct {
	repo *repository.Repo
}

func New(repo *repository.Repo) *Serv {
	return &Serv{repo: repo}
}
