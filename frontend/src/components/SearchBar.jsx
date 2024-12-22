import React, { useState } from "react";

function SearchUsers({ onResults }) {
    const [query, setQuery] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/search?query=${query}`); // Zapytanie do backendu
            if (response.ok) {
                const data = await response.json();
                onResults(data); // Przekazanie rezultatów do rodzica
            } else {
                console.error("Błąd HTTP:", response.status);
            }
        } catch (error) {
            console.error("Błąd podczas wyszukiwania użytkowników:", error);
        }
    };

    return (
            <form onSubmit={handleSearch} className="bg-white shadow p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Wyszukaj użytkownika</h2>
                <div className="flex items-center gap-4">
                    <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Wpisz frazę..."
                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Szukaj
                    </button>
                </div>
            </form>
    );
}

export default SearchUsers;
