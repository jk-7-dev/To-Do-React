package main

import (
	"log"
	"net/http"
	"todo-app/database"
	"todo-app/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	database.Connect()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Authorization"},
	}))

	r.Route("/api", func(r chi.Router) {
		// Public Auth Route
		r.Post("/login", handlers.Login)
		r.Post("/register", handlers.Register)
		// Task Routes
		r.Get("/tasks", handlers.GetTasks)
		r.Post("/tasks", handlers.CreateTask)
		r.Put("/tasks/{id}", handlers.UpdateTask)
		r.Delete("/tasks/{id}", handlers.DeleteTask)
	})

	log.Fatal(http.ListenAndServe(":8080", r))
}
