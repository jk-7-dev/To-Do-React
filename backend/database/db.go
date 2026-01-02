package database

import (
	"log"
	"todo-app/models" // Use module name 'todo-app'

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(sqlite.Open("todo.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto-migrate ensures 'users' and 'tasks' tables exist
	DB.AutoMigrate(&models.User{}, &models.Task{})
	log.Println("Database connection & migration successful")
}
