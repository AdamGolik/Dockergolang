"use client";

import { useState } from 'react';

export const UserForm = () => {
    const [user, setUser] = useState({
        name: '',
        last_name: '',
        age: '',
        email: '',
        username: '',
        password: '',
        telephone: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://localhost:8080/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to submit form");
                    }
                    return response.json();
                })
                .then(() => {
                    setUser({
                        name: "",
                        last_name: "",
                        age: "",
                        email: "",
                        username: "",
                        password: "",
                        telephone: "",
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
    };

    return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Add User</h2>
                <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="text"
                        placeholder="Last Name"
                        value={user.last_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, last_name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="number"
                        placeholder="Age"
                        value={user.age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, age: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, username: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <input
                        type="text"
                        placeholder="Telephone"
                        value={user.telephone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, telephone: e.target.value })}
                        className="w-full p-2 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Submit
                </button>
            </form>
    );
};
