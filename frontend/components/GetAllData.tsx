"use client"
import {motion} from 'framer-motion';
import {useState, useEffect, useRef} from 'react';
export const dynamic = 'force-dynamic'
export const GetAllData = () => {

    interface User {
        Id: number;
        name: string;
        last_name: string;
    }

    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const debounceTimeout = useRef<number | null>(null);

    useEffect(() => {
        async function fetchUsers(query: string = '') {
            try {
                setLoading(true);
                const url = query.trim()
                        ? `http://localhost:8080/search?search=${encodeURIComponent(query)}`
                        : `http://localhost:8080`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setUsers(Array.isArray(data.users) ? data.users : []);
            } catch (err: any) {
                setError(err.message || 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = window.setTimeout(() => fetchUsers(search), 300);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    if (loading)
        return <div className="text-center text-gray-700 animate-pulse text-xl mt-10">Loading users...</div>;
    if (error)
        return <div className="text-center text-red-600 text-xl mt-10">Error: {error}</div>;
    if (!users || users.length === 0)
        return <div className="text-center text-gray-500 text-xl mt-10">No users found.</div>;
    return (
            <>
                <div className={"m-4 p-5 bg-gray-300 h-screen rounded-lg overflow-auto"}>
                    <div className="flex justify-center mb-6 mt-4 ">
                        <input
                                type="text"
                                placeholder="Search users..."
                                className="rounded-lg text-black border-gray-300 px-4 py-2 text-lg w-full max-w-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ml-auto"
                                value={search}
                                onChange={handleSearchChange}
                        />
                    </div>
                    {users.map(user => (
                            <motion.div
                                    onClick={() => window.location.href = `/${user.Id}`}
                                    key={user.Id}
                                    className="flex flex-col justify-between items-center rounded-lg p-3 bg-black/70 mt-2 text-white shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs w-44 ml-auto m-3"
                                    whileHover={{scale: 1.05}}
                            >
                                <div
                                        className="w-16 h-16 bg-gradient-to-b from-gray-700 to-black rounded-full overflow-hidden flex items-center justify-center mb-2"
                                >
                                    {/* Placeholder for profile picture */}
                                    <span className="text-gray-400 font-bold text-md">{user.last_name.charAt(0).toUpperCase()}</span>
                                </div>
                                <motion.div
                                        className="flex flex-col items-center gap-1 text-center"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2}}
                                >
                                    <h2 className="text-md font-bold text-white">{user.name}</h2>
                                    <p className="text-xs text-gray-400">{user.last_name}</p>
                                </motion.div>
                            </motion.div>
                    ))}
                </div>
            </>
    );
};


