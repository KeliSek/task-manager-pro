'use client';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function LoginForm(){
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevents page refresh
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            await login(response.data.accessToken);
            router.push('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
  }
};
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <Button type="submit" isLoading={isLoading}>Login</Button>
            <p className="text-sm text-center text-gray-500"> Don&apos;t have an account? {' '}
                <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
        </form>
        
    )
}


