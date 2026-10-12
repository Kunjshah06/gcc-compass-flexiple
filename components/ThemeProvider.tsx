"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("gcc_theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(saved);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    if (typeof window === "undefined" || !document) return;

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const doc = document as any;

    // Modern Circular Ripple View Transition (Chrome, Edge, Safari 18+)
    if (typeof doc.startViewTransition === "function") {
      const x = e ? e.clientX : window.innerWidth / 2;
      const y = e ? e.clientY : window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      doc.documentElement.style.setProperty("--theme-x", `${x}px`);
      doc.documentElement.style.setProperty("--theme-y", `${y}px`);
      doc.documentElement.style.setProperty("--theme-radius", `${endRadius}px`);

      doc.startViewTransition(() => {
        setTheme(nextTheme);
        localStorage.setItem("gcc_theme", nextTheme);
        doc.documentElement.classList.remove("light", "dark");
        doc.documentElement.classList.add(nextTheme);
      });
      return;
    }

    // High-performance smooth fallback for browsers without View Transitions
    doc.documentElement.classList.add("theme-transitioning");
    setTheme(nextTheme);
    localStorage.setItem("gcc_theme", nextTheme);
    doc.documentElement.classList.remove("light", "dark");
    doc.documentElement.classList.add(nextTheme);

    setTimeout(() => {
      doc.documentElement.classList.remove("theme-transitioning");
    }, 350);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
