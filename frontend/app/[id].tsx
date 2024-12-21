"use client"; // Dodaj na początku każdego komponentu z react hooks

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function UserDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    interface User {
        name: string;
        last_name: string;
        age: number;
        email: string;
        username: string;
        telephone: string;
    }

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/${id}`)
                    .then((res) => res.json())
                    .then((data) => setUser(data));
        }
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
            <motion.div
                    className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">{user.name} {user.last_name}</h1>
                <p>
                    <strong>Age:</strong> {user.age}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Telephone:</strong> {user.telephone}
                </p>
                <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => router.push('/')}
                >
                    Back
                </button>
            </motion.div>
    );
}
