import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function UserDetails({ userId }) {
    const [userDetails, setUserDetails] = useState(null); // Stan dla szczegółów użytkownika
    const [isLoading, setIsLoading] = useState(false); // Stan ładowania
    const [error, setError] = useState(null); // Stan dla błędów

    useEffect(() => {
        if (userId) {
            fetchDetails(userId); // Pobierz szczegóły użytkownika
        } else {
            setUserDetails(null); // Jeśli brak `userId`, ustaw szczegóły na null
            setError(null); // Wyzeruj błędy
        }
    }, [userId]);

    const fetchDetails = async (id) => {
        setIsLoading(true); // Rozpocznij ładowanie
        setError(null); // Wyzeruj błąd, jeśli istnieje

        try {
            const response = await fetch(`http://localhost:8080/${id}`);
            if (response.ok) {
                const data = await response.json();

                if (Object.keys(data).length === 0) {
                    // Sprawdź, czy odpowiedź jest pusta
                    setError("Brak szczegółowych danych dla wybranego użytkownika.");
                    setUserDetails(null);
                } else {
                    setUserDetails(data); // Zapisz dane w stanie
                }
            } else {
                setError(`Błąd: Nie udało się pobrać danych. Kod odpowiedzi: ${response.status}`);
                setUserDetails(null);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania szczegółów użytkownika:", error);
            setError("Wystąpił błąd podczas połączenia z serwerem.");
            setUserDetails(null);
        } finally {
            setIsLoading(false); // Zakończ ładowanie
        }
    };

    if (!userId) {
        return (
                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 italic mt-6"
                >
                    Nie wybrano użytkownika. Kliknij na użytkownika, aby zobaczyć szczegóły.
                </motion.div>
        );
    }

    if (isLoading) {
        return (
                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 italic mt-6"
                >
                    Ładowanie szczegółów użytkownika...
                </motion.div>
        );
    }

    if (error) {
        return (
                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-red-500 italic mt-6"
                >
                    {error}
                </motion.div>
        );
    }

    if (!userDetails) {
        return (
                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 italic mt-6"
                >
                    Brak danych dla wybranego użytkownika.
                </motion.div>
        );
    }

    // Pobranie szczegółowych danych z odpowiedzi od serwera
    const { Id, name, last_name, age, email, username, password, telephone } = userDetails;

    return (
            <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 mt-6 rounded-lg shadow-lg text-white"
            >
                <h2 className="text-2xl font-bold mb-4">Szczegóły użytkownika</h2>
                <div className="grid grid-cols-2 gap-4 text-lg">
                    <p className="font-semibold">ID:</p>
                    <p>{Id || "Brak danych"}</p>
                    <p className="font-semibold">Imię:</p>
                    <p>{name || "Brak danych"}</p>
                    <p className="font-semibold">Nazwisko:</p>
                    <p>{last_name || "Brak danych"}</p>
                    <p className="font-semibold">Wiek:</p>
                    <p>{age || "Brak danych"}</p>
                    <p className="font-semibold">Email:</p>
                    <p>{email || "Brak danych"}</p>
                    <p className="font-semibold">Nazwa użytkownika:</p>
                    <p>{username || "Brak danych"}</p>
                    <p className="font-semibold">Hasło (hashed):</p>
                    <p>{password || "Brak danych"}</p>
                    <p className="font-semibold">Telefon:</p>
                    <p>{telephone || "Brak danych"}</p>
                </div>
            </motion.div>
    );
}

export default UserDetails;
