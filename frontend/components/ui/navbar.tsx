'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "./button";

export default function Navbar(){
    const {user, logout} = useAuth();
    return <nav className={`bg-white shadow-sm px-6 py-4 flex justify-between items-center`}>
        <Link href="/dashboard" className="text-xl font-bold text-blue-700">DevBoard</Link>
        <div className="flex items-center gap-4">
            <span className="text-gray-400">
                {user?.firstName} {user?.lastName}
            </span>
            <Button variant="secondary" onClick={logout}> Logout</Button>
        </div>
    </nav>
}