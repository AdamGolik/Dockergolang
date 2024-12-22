"use client"
import { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import {GetAllData} from "@/components/GetAllData";
export const dynamic = 'force-dynamic'
export default function Home({ params }: { params: any }) {
    const [user, setUser] = useState<any>(null); // Przechowuje dane użytkownika
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedUser, setEditedUser] = useState<any>(null);

    useEffect(() => {
        async function unwrapParams() {
            const { id } = await params;
            setId(id); // Ustaw id po rozpakowaniu
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;
        fetchData(); // Pobierz dane użytkownika
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/${id}`);
            if (!response.ok) throw new Error("Failed to fetch user data");

            const data = await response.json();
            data.user.password = fakeDecryptPassword(data.user.password); // Symulujemy odszyfrowanie hasła
            setUser(data.user);
        } catch (err: any) {
            setError(err.message || "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    // "Symulacja odszyfrowania" hasła do prezentacji
    const fakeDecryptPassword = (hashedPassword: string): string => {
        return "********"; // Zwraca placeholder zamiast odszyfrowywać hasło
    };

    const handleDelete = async () => {
        if (!id) return;
        try {
            const response = await fetch(`http://localhost:8080/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete user");
            alert("User deleted successfully!");
            setUser(null);
            window.location.href = `/`; // Przekierowuje na stronę główną
        } catch (err: any) {
            alert(err.message || "Failed to delete user");
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // Aktywacja trybu edycji
        setEditedUser({ ...user }); // Kopia danych użytkownika do formularza
    };

    const handleSave = async () => {
        try {
            // Jeśli hasło zostało zmienione, zhashuj je przed wysłaniem
            if (editedUser.password !== "********") {
                editedUser.password = sha256(editedUser.password).toString(); // Hashowanie hasła
            }
            const response = await fetch(`http://localhost:8080/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedUser),
            });
            if (!response.ok) throw new Error("Failed to save user data");
            alert("User updated successfully!");
            setUser(editedUser); // Aktualizacja danych na stronie
            setIsEditing(false);
        } catch (err: any) {
            alert(err.message || "Failed to update user");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser((prev: any) => ({ ...prev, [name]: value })); // Aktualizacja danych formularza
    };

    if (loading || !id)
        return <div className="text-center text-gray-700 animate-pulse text-xl mt-10">Loading user...</div>;

    if (error)
        return <div className="text-center text-red-600 text-xl mt-10">Error: {error}</div>;

    if (!user)
        return <div className="text-center text-gray-500 text-xl mt-10">No user data available.</div>;

    return (
            <>
                <div className="flex flex-row min-h-screen bg-gray-100">
                    {/* Lewa sekcja z komponentem GetAllData */}
                    <div className="w-1/4 bg-white p-4 shadow-lg">
                        <GetAllData />
                    </div>

                    {/* Środkowa sekcja szczegółów */}
                    <div className="flex flex-col justify-center items-center w-3/4">
                        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl text-black font-bold text-center">
                                    {isEditing ? "Edytuj użytkownika" : "Szczegóły użytkownika"}
                                </h1>
                            </div>

                            {!isEditing ? (
                                    // Wyświetlanie szczegółów użytkownika
                                    <div className="text-lg text-gray-800 mb-4">
                                        <p><strong>Imię:</strong> {user.name}</p>
                                        <p><strong>Nazwisko:</strong> {user.last_name}</p>
                                        <p><strong>Wiek:</strong> {user.age}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Telefon:</strong> {user.telephone}</p>
                                        <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
                                        <p><strong>Hasło:</strong> {user.password}</p>
                                    </div>
                            ) : (
                                    // Formularz edycji
                                    <div className="text-lg text-gray-800 mb-4">
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Imię:</label>
                                            <input
                                                    type="text"
                                                    name="name"
                                                    value={editedUser.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Nazwisko:</label>
                                            <input
                                                    type="text"
                                                    name="last_name"
                                                    value={editedUser.last_name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Wiek:</label>
                                            <input
                                                    type="number"
                                                    name="age"
                                                    value={editedUser.age}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Email:</label>
                                            <input
                                                    type="email"
                                                    name="email"
                                                    value={editedUser.email}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Telefon:</label>
                                            <input
                                                    type="text"
                                                    name="telephone"
                                                    value={editedUser.telephone}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Nazwa użytkownika:</label>
                                            <input
                                                    type="text"
                                                    name="username"
                                                    value={editedUser.username}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-gray-700">Hasło:</label>
                                            <input
                                                    type="password"
                                                    name="password"
                                                    value={editedUser.password}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                            />
                                        </div>
                                    </div>
                            )}

                            <div className="flex gap-4 mt-4">
                                {!isEditing ? (
                                        <>
                                            <button
                                                    onClick={handleEdit}
                                                    className="w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200"
                                            >
                                                Edytuj
                                            </button>
                                            <button
                                                    onClick={handleDelete}
                                                    className="w-full py-2 px-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-all duration-200"
                                            >
                                                Usuń
                                            </button>
                                        </>
                                ) : (
                                        <>
                                            <button
                                                    onClick={handleSave}
                                                    className="w-full py-2 px-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-all duration-200"
                                            >
                                                Zapisz
                                            </button>
                                            <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="w-full py-2 px-4 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200"
                                            >
                                                Anuluj
                                            </button>
                                        </>
                                )}
                            </div>

                            {/* Przycisk Exit */}
                            <button
                                    onClick={() => (window.location.href = "/")}
                                    className="w-full mt-6 py-2 px-4 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200"
                            >
                                Wyjście
                            </button>
                        </div>
                    </div>
                </div>
            </>
                );
                }