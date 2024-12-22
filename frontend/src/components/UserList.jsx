import React, {useEffect, useState} from "react";

function UserList({onSelectUser}) {
    const [users, setUsers] = useState([]);

    // Funkcja pobierająca użytkowników z backendu
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/"); // Komunikacja z backendem
            if (response.ok) {
                const data = await response.json(); // Parsowanie danych JSON
                if (Array.isArray(data.users)) {
                    const filteredUsers = data.users.map(user => ({
                        id: user.Id,
                        name: user.name,
                        lastName: user.last_name
                    })); // Wyciągnięcie tylko potrzebnych danych
                    setUsers(filteredUsers); // Ustawienie danych do state
                } else {
                    console.error("Nieprawidłowe dane użytkownika:", data);
                }
            } else {
                console.error("Błąd HTTP:", response.status);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania użytkowników:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Pobranie użytkowników przy załadowaniu komponentu
    }, []);

    return (
            <div className="bg-white shadow p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista użytkowników</h2>
                <ul className="space-y-2">
                    {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                    <li key={user.id}
                                        className="flex justify-between items-center bg-gray-100 p-2 rounded">
                            <span className="text-gray-700">
                                {user.name} {user.lastName}
                            </span>
                                        <button
                                                onClick={() => onSelectUser(user.id)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                        >
                                            Wybierz
                                        </button>
                                    </li>
                            ))
                    ) : (
                            <p className="text-gray-600 italic">Brak użytkowników do wyświetlenia.</p>
                    )}
                </ul>
            </div>
    );
}

export default UserList;
