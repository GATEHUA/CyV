package database

import (
	"context"
	"fmt"

	"github.com/GATEHUA/CyV/server/setting"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func New(ctx context.Context, s *setting.Setting) (*sqlx.DB, error) {
	connectionString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		s.DbHost, s.DbPort, s.DbUser, s.DbPassword, s.DbName)
	return sqlx.ConnectContext(ctx, "postgres", connectionString)
}
