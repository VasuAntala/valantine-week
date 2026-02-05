import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import socket from '../services/socket';

const PresenceIndicator = () => {
    const [presence, setPresence] = useState({
        adminOnline: false,
        recipientOnline: false
    });

    useEffect(() => {
        // Listen for presence updates
        socket.on('presence:update', (data) => {
            setPresence(data);
        });

        return () => {
            socket.off('presence:update');
        };
    }, []);

    const bothOnline = presence.adminOnline && presence.recipientOnline;

    return (
        <AnimatePresence>
            {bothOnline && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="fixed top-8 right-8 z-50 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-rose-300 flex items-center gap-2"
                >
                    <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Both of you are here! 💕
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PresenceIndicator;
