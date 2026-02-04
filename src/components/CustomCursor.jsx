import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-rose-400 rounded-full pointer-events-none z-50 mix-blend-multiply filter blur-[1px]"
            animate={{ x: position.x - 12, y: position.y - 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
};

export default CustomCursor;
