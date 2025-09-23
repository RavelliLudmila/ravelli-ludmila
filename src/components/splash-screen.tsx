'use client';

import { motion } from 'framer-motion';

export function SplashScreen() {
    return (
        <div className="h-screen flex flex-col items-center justify-between bg-primary p-8">
            <div className="flex-1 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center"
                >
                    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-white">LR</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex justify-center space-x-1 mt-8"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-center"
            >
                <p className="text-gray-800 text-lg font-medium">from Ludmila</p>
            </motion.div>
        </div>
    );
}
