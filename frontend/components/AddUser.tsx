"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const AddUser = () => {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<number | string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const userData = {
                name,
                last_name: lastName,
                age: Number(age),
                email,
                username,
                password,
                telephone,
            };

            const response = await fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error("Failed to add user");
            setSuccessMessage("User successfully added!");
            resetForm();
        } catch (error) {
            setErrorMessage("Failed to add user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setName("");
        setLastName("");
        setAge("");
        setEmail("");
        setUsername("");
        setPassword("");
        setTelephone("");
    };

    return (
            <div className="flex flex-col items-center justify-center h-screen m-1 min-h-screen p-6 overflow-auto">
                <motion.div
                        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                >
                    <h1 className="text-2xl text-black text-center font-bold mb-6">Dodaj użytkownika</h1>

                    <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                        {/* Pole Imię */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Imię</label>
                            <input
                                    type="text"
                                    placeholder="Wprowadź imię"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Pole Nazwisko */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Nazwisko</label>
                            <input
                                    type="text"
                                    placeholder="Wprowadź nazwisko"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Pole Wiek */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Wiek</label>
                            <input
                                    type="number"
                                    placeholder="Wprowadź wiek"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                                    min="1"
                                    max="120"
                            />
                        </div>

                        {/* Pole Email */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Email</label>
                            <input
                                    type="email"
                                    placeholder="Wprowadź email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Pole Nazwa użytkownika */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Nazwa użytkownika</label>
                            <input
                                    type="text"
                                    placeholder="Wprowadź nazwę użytkownika"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Pole Hasło */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Hasło</label>
                            <input
                                    type="password"
                                    placeholder="Wprowadź hasło"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Pole Telefon */}
                        <div>
                            <label className="text-lg font-medium text-gray-700">Telefon</label>
                            <input
                                    type="tel"
                                    placeholder="Wprowadź numer telefonu"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                    required
                            />
                        </div>

                        {/* Przycisk Dodaj */}
                        <motion.button
                                type="submit"
                                className={`w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                disabled={isSubmitting}
                        >
                            {isSubmitting ? "Dodawanie..." : "Dodaj użytkownika"}
                        </motion.button>
                    </form>

                    {/* Wiadomości o powodzeniu/błędzie */}
                    {successMessage && (
                            <motion.div
                                    className="mt-4 p-3 text-green-700 bg-green-100 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                            >
                                {successMessage}
                            </motion.div>
                    )}
                    {errorMessage && (
                            <motion.div
                                    className="mt-4 p-3 text-red-700 bg-red-100 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                            >
                                {errorMessage}
                            </motion.div>
                    )}
                </motion.div>
            </div>
    );
};
