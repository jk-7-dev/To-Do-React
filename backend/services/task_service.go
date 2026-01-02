package services

import (
	"todo-app/database"
	"todo-app/models"
)

func GetAllTasks() ([]models.Task, error) {
	var tasks []models.Task
	err := database.DB.Find(&tasks).Error
	return tasks, err
}

func CreateTask(task *models.Task) error {
	return database.DB.Create(task).Error
}

func UpdateTaskStatus(id string) (*models.Task, error) {
	var task models.Task
	if err := database.DB.First(&task, id).Error; err != nil {
		return nil, err
	}
	// Toggle logic
	if task.Status == "pending" {
		task.Status = "completed"
	} else {
		task.Status = "pending"
	}
	err := database.DB.Save(&task).Error
	return &task, err
}

func DeleteTask(id string) error {
	return database.DB.Delete(&models.Task{}, id).Error
}
