
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldUser, House, Package, LogOut } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import ThemeImage from "@/components/ThemeImage";

export default function AdminNavbar() {
  const router = useRouter();

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      router.replace("/isAdmin");
    });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 shadow-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-6">

       
        <Link
          href="/"
          aria-label="E-Store home"
          className="flex shrink-0 items-center"
        >
          <ThemeImage
            lightSrc="/logoed1.png"
            darkSrc="/logoed2.jpg"
            alt="E-Store logo"
            className="h-auto w-24 shrink-0 object-contain sm:w-24 lg:w-28"
          />
        </Link>

        
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white/60 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-600 hover:text-white"
          >
            <House size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white/60 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-600 hover:text-white"
          >
            <Package size={18} />
            <span className="hidden sm:inline">Products</span>
          </Link>

          
          <ThemeToggle />

          
          <div className="hidden items-center gap-2 rounded-lg bg-gray-600 px-3 py-2 text-sm font-semibold text-white md:flex">
            <ShieldUser size={20} />
            Admin
          </div>

          
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-4 cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
