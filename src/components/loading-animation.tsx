'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';

export function LoadingAnimation() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 bg-gradient-to-br from-background to-muted/50 flex items-center justify-center"
                >
                    <div className="text-center space-y-6">
                        {/* Logo animado */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-20 h-20 mx-auto">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
                                />
                                <div className="absolute inset-4 bg-gradient-to-br from-pink-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <Code className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Texto principal */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-2"
                        >
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-blue-500 bg-clip-text text-transparent">
                                Ludmila Ravelli
                            </h2>
                            <p className="text-muted-foreground text-sm">Cargando portfolio...</p>
                        </motion.div>

                        {/* Barra de progreso */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="w-64 mx-auto"
                        >
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full bg-gradient-to-r from-pink-400 to-blue-500 rounded-full"
                                />
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                                className="text-xs text-muted-foreground mt-2"
                            >
                                {Math.round(progress)}%
                            </motion.p>
                        </motion.div>

                        {/* Partículas flotantes */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ 
                                        x: Math.random() * window.innerWidth,
                                        y: window.innerHeight + 20,
                                        opacity: 0
                                    }}
                                    animate={{
                                        y: -20,
                                        opacity: [0, 1, 0],
                                        x: Math.random() * window.innerWidth
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                        ease: "linear"
                                    }}
                                    className="absolute"
                                >
                                    <Sparkles 
                                        className="w-4 h-4 text-primary/40" 
                                        style={{
                                            transform: `rotate(${Math.random() * 360}deg)`
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}