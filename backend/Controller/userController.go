package Controller

import (
	"awesomeProject12/initializers"
	"awesomeProject12/models"
	"crypto/sha256"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

// GET
// all users
func GetAllUsers(c *gin.Context) {
	var users []models.User

	// Dodaj lepszą obsługę błędów
	if err := initializers.DB.Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve users"})
		return
	}

	if len(users) == 0 {
		c.JSON(404, gin.H{"message": "No users found"})
		return
	}

	c.JSON(200, gin.H{"users": users})
}

// by id
func GetUserById(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	// Sprawdzanie, czy ID jest liczbą całkowitą
	if _, err := strconv.Atoi(id); err != nil {
		c.JSON(400, gin.H{"error": "Invalid ID format"})
		return
	}

	// Znajdowanie użytkownika po ID
	if err := initializers.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	c.JSON(200, gin.H{"user": user})
}

// by search
func GetUserBySearch(c *gin.Context) {
	var users []models.User
	value := c.Query("search")

	if value == "" {
		c.JSON(400, gin.H{"error": "Search query cannot be empty"})
		return
	}

	// Poprawne zapytanie z LIKE
	if err := initializers.DB.Where("name LIKE ? OR last_name LIKE ? OR email LIKE ? OR telephone LIKE ?",
		"%"+value+"%", "%"+value+"%", "%"+value+"%", "%"+value+"%").Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to search users"})
		return
	}

	if len(users) == 0 {
		c.JSON(404, gin.H{"message": "No users found matching the search query"})
		return
	}

	c.JSON(200, gin.H{"users": users})
}

// POST
// adding user we need like pass need to be 1-190 char  email ect
func AddUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Weryfikacja długości hasła
	if len(user.Password) < 6 || len(user.Password) > 190 {
		c.JSON(400, gin.H{"error": "Password must be between 6 and 190 characters"})
		return
	}

	// Weryfikacja poprawności emaila (dodatkowe walidacje można dodać tutaj)
	if user.Email == "" {
		c.JSON(400, gin.H{"error": "Email is required"})
		return
	}

	hashedPassword := sha256.Sum256([]byte(user.Password))
	user.Password = fmt.Sprintf("%x", hashedPassword)

	if err := initializers.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create user: " + err.Error()})
		return
	}

	c.JSON(201, gin.H{"message": "User created successfully", "user": user})
}

// PUT
// we need to search users
// we need by an id
func UpdateUserById(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	// Use First to find the user by ID
	if err := initializers.DB.First(&user, id).Error; err != nil {
		// Handle case where user is not found
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	// Bind JSON data from the request body to the user struct
	if err := c.ShouldBindJSON(&user); err != nil {
		// Return error if JSON binding fails
		c.JSON(400, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Update the user details in the database
	if err := initializers.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update user: " + err.Error()})
		return
	}

	// Return the updated user
	c.JSON(200, gin.H{"message": "User updated successfully", "user": user})
}

// DELETE
// by id
func DeleteUserById(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	// Szukaj użytkownika przed usunięciem
	if err := initializers.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	// Usuń użytkownika
	if err := initializers.DB.Delete(&user, id).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(200, gin.H{"message": "User with ID " + id + " deleted successfully"})
}
