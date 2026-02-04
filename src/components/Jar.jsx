import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

import { useConfig } from '../context/ConfigContext';

const Jar = () => {
    const { config } = useConfig();
    const reasons = config.jarReasons;
    const [isOpen, setIsOpen] = useState(false);
    const [currentReason, setCurrentReason] = useState("");

    const openJar = () => {
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
        setCurrentReason(randomReason);
        setIsOpen(true);
    };

    return (
        <section className="py-20 flex flex-col items-center justify-center relative">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-display text-rose-600 mb-4">Some Reasons That I Love You</h2>
                <p className="text-gray-600">Click the jar to find out why...</p>
            </motion.div>

            {/* Jar Container */}
            <motion.div
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openJar}
            >
                <div className="w-40 h-56 md:w-48 md:h-64 bg-white/40 border-4 border-rose-300 rounded-[3rem] rounded-t-lg relative flex items-end justify-center pb-4 shadow-xl backdrop-blur-sm overflow-hidden">
                    {/* Lid */}
                    <div className="absolute -top-4 w-44 md:w-52 h-6 bg-rose-400 rounded-lg shadow-md" />

                    {/* Hearts inside */}
                    <div className="absolute inset-0 flex items-end justify-center p-4 flex-wrap content-end gap-2 opacity-80">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-pink-400/60 blur-[1px]" />
                        ))}
                    </div>

                    <span className="font-display text-rose-500 text-xl z-10 bg-white/80 px-4 py-1 rounded-full">Open Me</span>
                </div>
            </motion.div>

            {/* Modal/Note Reveal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl border-4 border-rose-100"
                            initial={{ scale: 0.5, y: 100, rotate: -10 }}
                            animate={{ scale: 1, y: 0, rotate: 0 }}
                            exit={{ scale: 0.5, y: 100, rotate: 10 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-rose-50 rounded-full transition-colors"
                            >
                                <X className="text-gray-400" />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-6">
                                <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
                                <p className="text-2xl font-display text-gray-800 leading-relaxed">
                                    "{currentReason}"
                                </p>
                                <button
                                    onClick={openJar}
                                    className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                                >
                                    Another Reason
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Jar;
