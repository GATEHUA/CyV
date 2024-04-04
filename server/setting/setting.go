package setting

import (
	"os"

	"github.com/joho/godotenv"
)

// var settingInstance *setting

type Setting struct {
	Port, DbHost, DbPort, DbUser, DbPassword, DbName, FrontUrl, TokeSecret, UserSendEmails, PasswordSendEmails, ByteKey32, SmtpServer, SmtpPort string
}

// func init() {
// 	if err := godotenv.Load(); err != nil {
// 		log.Fatal(err)
// 	}
// 	settingInstance = loadsetting()
// }

func Loadsetting() (*Setting, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}
	return &Setting{
		Port:               getEnvWithDefault("PORT", "8080"),
		DbHost:             getEnvWithDefault("DB_HOST", "localhost"),
		DbPort:             getEnvWithDefault("DB_PORT", "5432"),
		DbUser:             getEnvWithDefault("DB_USER", "postgres"),
		DbPassword:         getEnvWithDefault("DB_PASSWORD", "postgres"),
		DbName:             getEnvWithDefault("DB_NAME", "postgres"),
		FrontUrl:           getEnvWithDefault("FRONT_URL", "http://localhost:5173"),
		TokeSecret:         getEnvWithDefault("TOKEN_SECRET", "CHUNGAR_TICA_MirzaxDev"),
		UserSendEmails:     getEnvWithDefault("USER_SEND_EMAILS", "mirzaxdev@gmail.com"),
		PasswordSendEmails: getEnvWithDefault("PASSWORD_SEND_EMAILS", "octvgyiayxyldxau"),
		ByteKey32:          getEnvWithDefault("32_BYTE_KEY", "CHUNG-PASCO-TICA_DEV:_MIRZAXDEV*"),
		SmtpServer:         getEnvWithDefault("SMTP_SERVER", "smtp.gmail.com"),
		SmtpPort:           getEnvWithDefault("SMTP_PORT", "587"),
	}, nil
}

func getEnvWithDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
