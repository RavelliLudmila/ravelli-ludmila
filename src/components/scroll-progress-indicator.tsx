'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/use-scroll-animations';

export function ScrollProgressIndicator() {
    const scrollProgress = useScrollProgress();

    return (
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress / 100 }}
            transition={{ duration: 0.1 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 transform-gpu z-50"
            style={{ transformOrigin: '0%' }}
        />
    );
}
