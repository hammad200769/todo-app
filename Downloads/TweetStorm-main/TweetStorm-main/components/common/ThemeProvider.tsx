'use client';

import { THEME } from '@/types/types';
import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<THEME>(THEME.Light);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as THEME) || THEME.Light;
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);

    // Mark theme as ready to prevent flash
    document.documentElement.classList.add('theme-ready');

    return () => {
      document.documentElement.classList.remove(THEME.Light, THEME.Dark);
    };
  }, []);

  function toggleTheme() {
    const newTheme = theme === THEME.Light ? THEME.Dark : THEME.Light;
    setTheme(newTheme);
    document.documentElement.classList.remove(THEME.Light, THEME.Dark);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
