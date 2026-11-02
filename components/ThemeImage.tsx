
"use client";

import { useEffect, useState } from "react";

type ThemeImageProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
};

export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  className = "",
}: ThemeImageProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setDarkMode(
        document.documentElement.classList.contains("dark")
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={darkMode ? darkSrc : lightSrc}
      alt={alt}
      className={className}
    />
  );
}
