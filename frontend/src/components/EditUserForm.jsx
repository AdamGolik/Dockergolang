import React, { useState } from "react";

function EditUserForm({ user, onUserUpdated }) {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUserUpdated(formData);
    };

    return (
            <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Edytuj użytkownika</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="text-gray-700 font-medium">
                            Imię:
                        </label>
                        <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Dodaj więcej pól w podobny sposób */}
                </div>
                <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Zapisz zmiany
                </button>
            </form>
    );
}

export default EditUserForm;
