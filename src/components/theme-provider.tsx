'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: 'light' | 'dark';
    resolvedTheme: 'light' | 'dark';
};

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
    systemTheme: 'dark',
    resolvedTheme: 'dark',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'ludmila-portfolio-theme',
    enableSystem = true,
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        }
        return defaultTheme;
    });
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system' && enableSystem) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

            root.classList.add(systemTheme);
            setSystemTheme(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme, enableSystem]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem(storageKey, theme);
            }
            setTheme(theme);
        },
        systemTheme,
        resolvedTheme: theme === 'system' ? systemTheme : theme,
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};
