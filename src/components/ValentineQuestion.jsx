import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineQuestion = () => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [yesPressed, setYesPressed] = useState(false);

    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
        const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
        setNoButtonPos({ x, y });
    };

    const handleYes = () => {
        setYesPressed(true);
        confetti({
            particleCount: 150,
            spread: 60,
            colors: ['#ff3366', '#ff99cc', '#ffffff']
        });
    };

    return (
        <section className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="text-center space-y-8"
            >
                <h2 className="text-4xl md:text-6xl font-display text-rose-600">
                    {yesPressed ? "Yay! I Love You! 💖" : "Will You Be My Valentine?"}
                </h2>

                {!yesPressed && (
                    <div className="flex gap-8 items-center justify-center relative h-20">
                        <motion.button
                            className="px-8 py-3 bg-green-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-green-600 transition-colors z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleYes}
                        >
                            YES!
                        </motion.button>

                        <motion.button
                            className="px-8 py-3 bg-rose-500 text-white rounded-full text-xl font-bold shadow-lg"
                            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                            onHoverStart={moveNoButton}
                            onClick={moveNoButton}
                        >
                            NO
                        </motion.button>
                    </div>
                )}

                {yesPressed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl text-gray-700"
                    >
                        <p>Best decision ever! 🥰</p>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mt-4 flex justify-center"
                        >
                            <Heart size={48} className="text-rose-500 fill-rose-500" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default ValentineQuestion;
