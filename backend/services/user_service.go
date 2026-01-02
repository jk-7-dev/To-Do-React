package services

import (
	"errors"
	"todo-app/database"
	"todo-app/models"

	"golang.org/x/crypto/bcrypt"
)

// RegisterUser hashes the password before saving
func RegisterUser(user *models.User) error {
	var existingUser models.User
	err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error
	if err == nil {
		return errors.New("user already exists with this email")
	}

	// Generate hashed password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return database.DB.Create(user).Error
}

// AuthenticateUser compares the hashed password with the input
func AuthenticateUser(email, password string) (*models.User, error) {
	var user models.User
	err := database.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, errors.New("user not found")
	}

	// Compare input password with hashed password in database
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	return &user, nil
}
