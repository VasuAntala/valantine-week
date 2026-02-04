import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import confetti from 'canvas-confetti';

import { useConfig } from '../context/ConfigContext';

const Hero = ({ text, onStart, showButton = true }) => {
    const { config } = useConfig();
    const [isStarted, setIsStarted] = useState(false);

    // Determine text: Use prop if provided, otherwise standard greetings based on state
    const displayText = text || (showButton ? "For My Special Person..." : `Happy Valentine's Day ${config.recipientName}`);

    const title = useTypewriter(displayText, 100);

    const handleStart = () => {
        setIsStarted(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff3366', '#ff99cc', '#ffffff']
        });
        onStart && onStart();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-pink-50 to-pink-100 p-4">
            {/* Background Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-200"
                        initial={{
                            y: -50,
                            x: Math.random() * window.innerWidth,
                            rotate: 0,
                            opacity: 0
                        }}
                        animate={{
                            y: window.innerHeight + 50,
                            rotate: 360,
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        <Heart size={Math.random() * 30 + 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="z-10 text-center space-y-4 md:space-y-8 px-4">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl font-display text-rose-600 drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {title}
                    <span className="animate-pulse">|</span>
                </motion.h1>

                {!isStarted && showButton && (
                    <motion.button
                        className="px-6 py-2 md:px-8 md:py-3 bg-rose-500 text-white rounded-full text-lg md:text-xl font-semibold shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-2 mx-auto"
                        onClick={handleStart}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 3, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart className="w-5 h-5 md:w-6 md:h-6 animate-bounce" fill="currentColor" />
                        Enter Our World
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default Hero;
