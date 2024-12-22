import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function UserList({ users = [], onSelectUser, showSkeleton = false }) {
    const [allUsers, setAllUsers] = useState(users);

    useEffect(() => {
        if (!users.length) {
            fetchAllUsers();
        } else {
            setAllUsers(users);
        }
    }, [users]);

    const fetchAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/");
            if (response.ok) {
                const data = await response.json();
                setAllUsers(data.users);
            } else {
                console.error("Błąd HTTP:", response.status);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania użytkowników:", error);
        }
    };

    return (
            <div className="grid gap-4">
                {showSkeleton
                        ? Array(4)
                                .fill("")
                                .map((_, idx) => (
                                        <div
                                                className="bg-gray-100 animate-pulse p-4 rounded shadow"
                                                key={idx}
                                        ></div>
                                ))
                        : allUsers.map((user) => (
                                <motion.div
                                        key={user.Id}
                                        className="bg-gradient-to-tr from-blue-600 to-blue-400 p-4 rounded-lg text-white shadow-md hover:scale-105 transform transition duration-300"
                                        onClick={() => onSelectUser(user.Id)}
                                >
                                    <h3 className="text-lg font-semibold">{`${user.name} ${user.last_name}`}</h3>
                                    <p className="text-sm">Kliknij, aby zobaczyć szczegóły.</p>
                                </motion.div>
                        ))}
            </div>
    );
}

export default UserList;
