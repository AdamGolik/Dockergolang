import React, {useState} from "react";

function AddUserForm({onUserAdded}) {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        age: "",
        email: "",
        username: "",
        password: "",
        telephone: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    last_name: formData.last_name,
                    age: parseInt(formData.age),
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    telephone: formData.telephone
                })
            });

            if (response.ok) {
                alert("Użytkownik został dodany pomyślnie!");
                setFormData({
                    name: "",
                    last_name: "",
                    age: "",
                    email: "",
                    username: "",
                    password: "",
                    telephone: ""
                });
                onUserAdded(); // Informuje rodzica o dodaniu użytkownika
            } else {
                alert("Wystąpił błąd podczas dodawania użytkownika.");
            }
        } catch (error) {
            console.error("Błąd:", error);
            alert("Wystąpił błąd podczas komunikacji z serwerem.");
        }
    };

    return (
            <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
            >
                <h2 className="text-lg font-bold mb-6 text-center">Dodaj nowego użytkownika</h2>

                {/* Pola formularza */}
                <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Imię"
                />
                <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Nazwisko"
                />
                <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Wiek"
                />
                <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Email"
                />
                <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Nazwa użytkownika"
                />
                <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Hasło"
                />
                <input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Telefon"
                />
                <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Dodaj
                </button>
            </form>
    );
}

export default AddUserForm;
