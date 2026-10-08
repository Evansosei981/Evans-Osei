import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: (event?: React.MouseEvent) => void;
  selectedIdentity: 'evans';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved !== null ? saved === 'dark' : true; // default dark mode
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0C0C0C';
      document.body.style.color = '#EDEDED';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FA';
      document.body.style.color = '#111827';
    }
  }, [isDarkMode]);

  const toggleTheme = (event?: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDarkMode((prev) => !prev);
      return;
    }

    if (event && 'startViewTransition' in document) {
      try {
        const x = event.clientX || window.innerWidth / 2;
        const y = event.clientY || 40;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = (document as any).startViewTransition(() => {
          setIsDarkMode((prev) => !prev);
        });

        transition.ready?.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 450,
              easing: 'ease-in-out',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        }).catch(() => {
          setIsDarkMode((prev) => !prev);
        });
        return;
      } catch {
        // graceful fallback to standard smooth state transition
      }
    }

    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, selectedIdentity: 'evans' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
