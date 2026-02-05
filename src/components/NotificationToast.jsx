import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import socket from '../services/socket';

const NotificationToast = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Listen for incoming notifications
        socket.on('notification:received', (notification) => {
            const id = Date.now();
            setNotifications(prev => [...prev, { ...notification, id }]);

            // Auto remove after 5 seconds
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, 5000);
        });

        return () => {
            socket.off('notification:received');
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'thinking_of_you':
                return <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />;
            case 'yes_clicked':
                return <Sparkles className="w-6 h-6 text-yellow-500" />;
            default:
                return <Heart className="w-6 h-6 text-rose-500" />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'thinking_of_you':
                return 'from-pink-500 to-rose-500';
            case 'yes_clicked':
                return 'from-yellow-400 to-orange-500';
            default:
                return 'from-rose-500 to-pink-500';
        }
    };

    return (
        <div className="fixed top-20 right-8 z-[200] flex flex-col gap-3 max-w-sm">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 300, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 300, scale: 0.8 }}
                        className={`bg-gradient-to-r ${getColor(notification.type)} p-4 rounded-2xl shadow-2xl text-white relative overflow-hidden`}
                    >
                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0 bg-white opacity-10"
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        <div className="relative flex items-start gap-3">
                            <div className="mt-1">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-lg leading-tight">
                                    {notification.message}
                                </p>
                                <p className="text-xs text-white/80 mt-1">
                                    Just now
                                </p>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationToast;
