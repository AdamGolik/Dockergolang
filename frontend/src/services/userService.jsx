const API_URL = "http://localhost:8080";

// Pobiera wszystkich użytkowników
export const getUsers = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Pobiera użytkownika po ID
export const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

// Dodaje nowego użytkownika
export const addUser = async (user) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return response.json();
};

// Wyszukuje użytkowników po zapytaniu
export const searchUsers = async (query) => {
    const response = await fetch(`${API_URL}/search?search=${query}`);
    return response.json();
};
