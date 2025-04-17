import { createContext, useState } from "react";

export const ThemeToggleBtnContext = createContext();

export function ThemeToggleBtnProvider({ children }) {
     const [isDark, setIsDark] = useState("light");

     const handleThemeToggle = () => {
          setIsDark((prev) => (prev === "light" ? "dark" : "light"));
     };
     return (
          <ThemeToggleBtnContext.Provider value={{ isDark, handleThemeToggle }}>
               {children}
          </ThemeToggleBtnContext.Provider>
     );
}
