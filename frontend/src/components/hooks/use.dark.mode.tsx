'use client'
import { useEffect, useState } from "react";

type UseDarkModeReturnType = [string, (theme: string) => void];

const useDarkMode = (): UseDarkModeReturnType => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") || "light";
    }
    return "light"; // Fallback for server-side rendering
  });

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      // save theme to local storage
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
