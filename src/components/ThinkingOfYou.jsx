import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const ThinkingOfYou = () => {
    const [isSending, setIsSending] = React.useState(false);
    const [sent, setSent] = React.useState(false);

    const handleClick = () => {
        setIsSending(true);

        setTimeout(() => {
            setIsSending(false);
            setSent(true);

            // Reset after 3 seconds
            setTimeout(() => setSent(false), 3000);
        }, 500);
    };

    return (
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
    );
};

export default ThinkingOfYou;
