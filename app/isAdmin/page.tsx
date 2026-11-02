"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldUser, CircleX } from "lucide-react";
import Toast from "@/components/Toast";

function AdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError("");
        }, 2000);

        return () => clearTimeout(timer);
    }, [error]);


    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (!response.ok) {
            setError(result.message || "Invalid Email or password!");
            return;
        }
        setShowToast(true);
        setTimeout(() => router.push("/admin"), 1200);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-8 sm:px-6 sm:py-12">
            <Toast
                message="Admin Login Successful!"
                show={showToast}
                onClose={() => setShowToast(false)}
            />

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:space-y-6 sm:p-7 md:p-8"
            >

                <h1 className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 rounded-xl border border-gray-600 px-4 py-3 text-center text-2xl font-bold text-gray-800 sm:gap-3 sm:px-7 sm:text-3xl">
                    <ShieldUser className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
                    <u>Admin Login</u>
                </h1>

                <p className="text-center text-base font-bold text-gray-900 sm:text-lg">
                    Login to Manage your Store
                </p>


                <div>
                    <label
                        htmlFor="admin-email"
                        className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base"
                    >
                        Email
                    </label>

                    <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter Email"
                        autoComplete="username"
                        required
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-200 sm:text-base"
                    />
                </div>


                <div>
                    <label
                        htmlFor="admin-password"
                        className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base"
                    >
                        Password
                    </label>

                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        required
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-200 sm:text-base"
                    />
                </div>


                {error && (
                    <p
                        role="alert"
                        className="flex justify-center items-center gap-2 rounded-lg border border-red-500 bg-red-500 p-3 text-md leading-5 text-white sm:text-base text-center"
                    >
                        <CircleX size={20} strokeWidth={3} />
                        <strong>{error}</strong>
                    </p>
                )}


                <button
                    type="submit"
                    disabled={showToast}
                    className="w-full rounded-lg bg-gray-600 p-3 text-sm font-semibold text-white transition duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base cursor-pointer"
                >
                    Login as Admin
                </button>


                <Link
                    href="/"
                    className="flex w-full items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-gray-700 sm:text-base"
                >
                    Back Home
                </Link>
            </form>
        </main>
    );
}

export default AdminLogin;