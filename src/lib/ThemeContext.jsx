import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("gladex-theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("gladex-theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}