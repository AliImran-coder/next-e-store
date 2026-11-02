
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = document.cookie.split("; ").find((row) => row.startsWith("theme="))?.split("=")[1];
    const isDark = savedTheme === "dark";

    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const newDarkMode = !darkMode;

    document.documentElement.classList.toggle("dark", newDarkMode);
    document.cookie = `theme=${newDarkMode ? "dark" : "light"}; path=/; max-age=31536000; SameSite=Lax`;
    setDarkMode(newDarkMode);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Loading theme"
        className="h-10 w-10 rounded-lg border border-gray-300"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light Mode" : "Dark Mode"}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      {darkMode ? <Sun size={21} /> : <Moon size={21} />}
    </button>
  );
}
