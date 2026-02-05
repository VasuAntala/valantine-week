import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const ThinkingOfYou = () => {
    const [isSending, setIsSending] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    const [showHearts, setShowHearts] = React.useState(false);

    const handleClick = () => {
        setIsSending(true);

        // Trigger floating hearts animation
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 3000);

        setTimeout(() => {
            setIsSending(false);
            setSent(true);

            // Reset after 3 seconds
            setTimeout(() => setSent(false), 3000);
        }, 500);
    };

    return (
        <>
            {/* Pink pulse overlay effect */}
            <AnimatePresence>
                {showHearts && (
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-radial from-pink-400/30 via-rose-300/20 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating hearts animation */}
            <AnimatePresence>
                {showHearts && (
                    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight + 50,
                                    scale: 0,
                                    rotate: Math.random() * 360
                                }}
                                animate={{
                                    y: -100,
                                    scale: [0, 1, 1, 0],
                                    rotate: Math.random() * 360 + 180,
                                    x: Math.random() * window.innerWidth
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                <Heart
                                    size={Math.random() * 30 + 20}
                                    className="text-pink-500 fill-pink-500 opacity-80"
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
                onClick={handleClick}
                disabled={isSending || sent}
                className={`fixed bottom-20 right-8 z-50 px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 flex items-center gap-2 ${sent
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                    }`}
                whileHover={{ scale: sent ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                {sent ? (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Sent!
                    </>
                ) : (
                    <>
                        <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                        Thinking of You
                    </>
                )}
            </motion.button>
        </>
    );
};

export default ThinkingOfYou;
