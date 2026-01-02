package models

type User struct {
	UserID   uint   `gorm:"primaryKey;column:user_id" json:"user_id"`
	UserName string `gorm:"column:user_name;not null" json:"user_name"`
	Email    string `gorm:"column:email;unique;not null" json:"email"`
	Password string `gorm:"column:password;not null" json:"-"` // Password hidden in JSON
}
