import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-blue-50">
            <div className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md`}>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">DevBoard</h1>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Register</h2>
                <RegisterForm />
            </div>
        </main>
    )
}