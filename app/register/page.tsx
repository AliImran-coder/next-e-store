"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Could not create your account.");
        return;
      }
      router.push("/products");
      router.refresh();
    } catch {
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-8 sm:px-6">
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
        <h1 className="flex items-center justify-center gap-3 text-2xl font-bold text-gray-800 sm:text-3xl">
          <UserRoundPlus /> Create Account
        </h1>
        {error && <p role="alert" className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}
        <label className="block text-sm font-semibold text-gray-700">Full name
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-gray-700">Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-semibold text-gray-700">Password
          <input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" placeholder="At least 6 characters" />
        </label>
        <button disabled={loading} className="w-full rounded-lg bg-gray-800 p-3 font-semibold text-white hover:bg-black disabled:opacity-60">{loading ? "Creating account..." : "Create Account"}</button>
        <p className="text-center text-sm text-gray-600">Already have an account? <Link className="font-semibold underline" href="/login">Login</Link></p>
        <Link href="/" className="block text-center text-sm underline">Back Home</Link>
      </form>
    </main>
  );
}
