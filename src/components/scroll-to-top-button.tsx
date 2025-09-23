'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
    className?: string;
}

export function ScrollToTopButton({ show, onClick, className = '' }: ScrollToTopButtonProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`fixed right-4 z-[60] ${className}`}
                    style={{
                        bottom: '5rem',
                    }}
                >
                    <Button
                        onClick={onClick}
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-12 h-12 p-0 shadow-lg bg-white/95 hover:bg-white border border-gray-200/50 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
                        aria-label="Volver al inicio de la conversación"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
