'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    const getIcon = () => {
        if (theme === 'system') {
            return <Monitor className="h-4 w-4" />;
        }
        return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
    };

    const getLabel = () => {
        if (theme === 'system') return 'Sistema';
        return resolvedTheme === 'dark' ? 'Oscuro' : 'Claro';
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className="relative overflow-hidden group"
            title={`Tema actual: ${getLabel()}`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                >
                    {getIcon()}
                </motion.div>
            </AnimatePresence>
            
            <motion.div
                className="absolute inset-0 bg-primary/10 rounded-md"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            />
        </Button>
    );
}