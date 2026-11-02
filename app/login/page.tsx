"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";

import { CircleUserRound } from "lucide-react";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowToast(false);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      alert(result.message || "Login failed");
      return;
    }
    setShowToast(true);
    const location = new URLSearchParams(window.location.search);
    const goto = location.get("redirect");
    setTimeout(() => router.push(goto === "/checkout" ? "/checkout" : "/products"), 1200);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-8 sm:px-6 sm:py-12">
      <Toast
        message="User Login Successful!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:space-y-6 sm:p-7 md:p-8"
      >
       
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800 sm:gap-3 sm:text-3xl">
          <CircleUserRound className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
          <u>Customer Login</u>
        </h1>

       
        <div>
          <label
            htmlFor="customer-email"
            className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base"
          >
            Email
          </label>

          <input
            id="customer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            autoComplete="email"
            required
            className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-200 sm:text-base"
          />
        </div>

        
        <div>
          <label
            htmlFor="customer-password"
            className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base"
          >
            Password
          </label>

          <input
            id="customer-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
            className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-200 sm:text-base"
          />
        </div>

        
        <p className="text-center text-sm text-gray-600">
          New customer? <Link href="/register" className="font-semibold underline">Create an account</Link>
        </p>

        <button
          type="submit"
          disabled={showToast}
          className="w-full rounded-lg bg-gray-800 p-3 text-sm font-semibold text-white transition duration-200 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          Login
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

export default Login;