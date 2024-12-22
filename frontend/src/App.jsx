import React, { useState } from "react";
import SearchUsers from "./components/SearchBar.jsx";
import AddUserForm from "./components/AddUserForm.jsx";
import UserList from "./components/UserList.jsx";
import UserDetails from "./components/UserDetails.jsx";

function App() {
    const [selectedUserId, setSelectedUserId] = useState(null); // ID wybranego użytkownika
    const [searchResults, setSearchResults] = useState([]); // Wyniki wyszukiwania

    return (
            <div className="container mx-auto p-6 space-y-6">
                {/* Pasek wyszukiwania */}
                <SearchUsers onResults={setSearchResults} />

                <div className="grid grid-cols-12 gap-6">
                    {/* Wyniki wyszukiwania - po lewej */}
                    <div className="col-span-3 bg-white shadow-lg rounded-lg h-auto p-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Wyniki wyszukiwania</h2>
                        <UserList users={searchResults} onSelectUser={setSelectedUserId} showSkeleton={!searchResults.length} />
                    </div>

                    {/* Środkowy panel - Dodawanie użytkownika */}
                    <div className="col-span-6">
                        <AddUserForm onUserAdded={() => alert("Użytkownik został dodany!")} />
                    </div>

                    {/* Panel użytkowników */}
                    <div className="col-span-3 bg-white shadow-lg rounded-lg h-auto p-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Lista Użytkowników</h2>
                        <UserList onSelectUser={setSelectedUserId} />
                    </div>
                </div>

                {/* Szczegóły użytkownika */}
                <UserDetails userId={selectedUserId} />
            </div>
    );
}

export default App;
