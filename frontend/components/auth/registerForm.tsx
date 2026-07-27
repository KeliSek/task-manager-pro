'use client';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm(){
    const router = useRouter();
    const { login } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevents page refresh
        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', { firstName, lastName, email, password });
            login(response.data.accessToken);
            router.push('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
  } 
};
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col">
                <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </div>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" isLoading={isLoading}>Register</Button>
            <p className="text-sm text-center text-gray-500"> Already have an account? {' '}
                <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </form>
    )
}