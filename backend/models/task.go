package models

type Task struct {
	ID uint `gorm:"primaryKey;column:task_id" json:"id"`

	Title string `gorm:"column:title;not null" json:"text"`

	Status string `gorm:"column:status;default:pending" json:"status"`

	Priority string `gorm:"column:priority;default:medium" json:"priority"`

	DueDate string `gorm:"column:due_date" json:"date"`

	UserID uint `gorm:"column:user_id" json:"user_id"`
}
