import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function SearchUsers({ onResults }) {
    const [query, setQuery] = useState(""); // Aktualne zapytanie z pola tekstowego
    const [previousQuery, setPreviousQuery] = useState(""); // Przechowuje poprzednie zapytanie
    const debounceTimeout = useRef(null);  // Referencja do timeoutu (debounce)

    useEffect(() => {
        // Jeśli pole jest puste, wyczyść wyniki
        if (query.trim() === "") {
            onResults([]); // Przekazanie pustej listy wyników do rodzica
            setPreviousQuery(""); // Reset poprzedniego zapytania
            return;
        }

        // Debounce – opóźnienie o 500ms
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            // Jeśli zapytanie jest takie samo jak poprzednie, nie wysyłaj zapytania
            if (query === previousQuery) {
                return;
            }

            // Aktualizuj poprzednie zapytanie i wykonaj wyszukiwanie
            setPreviousQuery(query); // Zapisz nową frazę jako poprzednią
            fetchResults(query); // Dokument wyszukiwania
        }, 500);

        // Cleanup timeouta przy zmianie zapytania
        return () => clearTimeout(debounceTimeout.current);
    }, [query]);

    const fetchResults = async (searchQuery) => {
        try {
            const response = await fetch(`http://localhost:8080/search?search=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                onResults(data.users || []); // Aktualizacja wyników w przypadku sukcesu
            } else {
                console.error("Błąd HTTP:", response.status);
                onResults([]); // Błąd powoduje pustą listę wyników
            }
        } catch (error) {
            console.error("Błąd podczas wyszukiwania użytkowników:", error);
            onResults([]); // Na wypadek błędu generujemy pusty wynik
        }
    };

    return (
            <motion.div
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
            >
                <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Ustawianie nowego query
                        placeholder="Wyszukaj użytkownika (np. 'Golik')"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
                />
            </motion.div>
    );
}

export default SearchUsers;
