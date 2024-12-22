import React, { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

function UserDetails({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userId) {
            getUserById(userId).then((data) => setUser(data));
        }
    }, [userId]);

    if (!user) {
        return <p>Wybierz użytkownika, aby zobaczyć szczegóły.</p>;
    }

    return (
            <div>
                <h2>Szczegóły użytkownika</h2>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Imię:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
    );
}

export default UserDetails;
