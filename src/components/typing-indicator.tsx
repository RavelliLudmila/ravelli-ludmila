'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-start">
            <div className="bg-card text-card-foreground p-3 rounded-2xl rounded-bl-md max-w-[80px]">
                <div className="flex gap-1 justify-center" aria-live="polite" aria-label="Escribiendo">
                    <div className="w-2 h-2 bg-current rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-current rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-current rounded-full typing-indicator"></div>
                </div>
            </div>
        </motion.div>
    );
}
