import { GetAllData } from "@/components/GetAllData";
import { AddUser } from "@/components/AddUser";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Lewy panel (Lista użytkowników) */}
            <div className="lg:w-72 p-3 justify-end items-end">
                <GetAllData />
            </div>

            {/* Prawy panel (Formularz dodania użytkownika) */}
            <div className="lg:w-3/4 p-4">
                <AddUser />
            </div>
        </div>
    );
}
