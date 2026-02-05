import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineQuestion = () => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [yesPressed, setYesPressed] = useState(false);
    const [noTextIndex, setNoTextIndex] = useState(0);

    const noTexts = [
        "NO",
        "No Please",
        "Are you sure?",
        "Think again!",
        "Really?",
        "Don't do this",
        "Pleeease",
        "Maybe reconsider?",
        "I'm serious",
        "Final answer?",
        "Come on...",
        "Pretty please?"
    ];

    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
        const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
        setNoButtonPos({ x, y });
        setNoTextIndex((prev) => (prev + 1) % noTexts.length);
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
                            {noTexts[noTextIndex]}
                        </motion.button>
                    </div>
                )}

                {yesPressed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl text-gray-700 space-y-6"
                    >
                        <p>Best decision ever! 🥰</p>

                        {/* Viral Cute Pandas Image */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="relative flex justify-center"
                        >
                            <img
                                src="https://media1.tenor.com/m/fFpVFqD_4esAAAAC/peluk.gif"
                                alt="Cute Hugging GIF"
                                className="rounded-3xl shadow-2xl max-w-md w-full border-4 border-pink-300"
                            />

                            {/* Floating hearts around the image */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    x: [0, 10, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-8 -right-8"
                            >
                                <Heart size={48} className="text-rose-500 fill-rose-500" />
                            </motion.div>
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    x: [0, -10, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                                className="absolute -top-4 -left-8"
                            >
                                <Heart size={36} className="text-pink-400 fill-pink-400" />
                            </motion.div>
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                                className="absolute -bottom-6 right-12"
                            >
                                <Heart size={40} className="text-rose-400 fill-rose-400" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default ValentineQuestion;
