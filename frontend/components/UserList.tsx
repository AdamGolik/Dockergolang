"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Zmiana z next/router
import { motion } from "framer-motion";

export const UserList = () => {
    const router = useRouter();
    const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/search?search=${search}`)
                .then((res) => res.json())
                .then((data) => setUsers(data));
    }, [search]);

    return (
            <div>
                {/* Wyszukiwarka */}
                <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full mb-4 p-2 border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                />
                {/* Lista użytkowników */}
                <ul>
                    {users.map((user) => (
                            <motion.li
                                    key={user.id}
                                    className="cursor-pointer hover:bg-gray-100 p-2 border-b"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push(`/${user.id}`)} // Nawigacja z routerem
                            >
                                {user.username}
                            </motion.li>
                    ))}
                </ul>
            </div>
    );
};
