'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-start">
            <div className="bg-card text-card-foreground p-3 rounded-2xl rounded-bl-md max-w-[80px] border border-border">
                <div className="flex gap-1 justify-center" aria-live="polite" aria-label="Escribiendo">
                    <motion.div
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: 0,
                        }}
                    />
                    <motion.div
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: 0.2,
                        }}
                    />
                    <motion.div
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: 0.4,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
