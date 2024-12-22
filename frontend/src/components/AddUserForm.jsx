import React, { useState } from "react";
import { motion } from "framer-motion";

function AddUserForm({ onUserAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        age: "",
        email: "",
        username: "",
        telephone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                onUserAdded();
                setFormData({
                    name: "",
                    last_name: "",
                    age: "",
                    email: "",
                    username: "",
                    telephone: "",
                    password: "",
                });
            } else {
                alert("Nie udało się dodać użytkownika.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    };

    return (
            <motion.form
                    onSubmit={handleSubmit}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white shadow-lg rounded-lg p-6"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900">Dodaj użytkownika</h2>
                <div className="grid gap-4">
                    <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Imię"
                            className="p-2 border rounded"
                    />
                    <input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Nazwisko"
                            className="p-2 border rounded"
                    />
                    <input
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Wiek"
                            type="number"
                            className="p-2 border rounded"
                    />
                    <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-2 border rounded"
                    />
                    <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nazwa użytkownika"
                            className="p-2 border rounded"
                    />
                    <input
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Telefon"
                            className="p-2 border rounded"
                    />
                    <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Hasło"
                            type="password"
                            className="p-2 border rounded"
                    />
                    <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Dodaj użytkownika
                    </button>
                </div>
            </motion.form>
    );
}

export default AddUserForm;
