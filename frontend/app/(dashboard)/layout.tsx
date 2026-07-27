'use client';
import Navbar from "@/components/ui/navbar";
import Skeleton from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: {children: React.ReactNode}){
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(()=> {
        if (!isLoading && !user){
            router.push('/login')
        }
    }, [user, isLoading, router]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Skeleton className="h-8 w-48"/>
        </div>
    )

    if(!user) return null;

    return <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-8">
                <>{children}</>
            </main>
        </div>
}