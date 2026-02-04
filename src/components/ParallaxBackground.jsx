import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const ParallaxBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springConfig = { damping: 25, stiffness: 120 };
    const mouseX = useSpring(mousePosition.x, springConfig);
    const mouseY = useSpring(mousePosition.y, springConfig);

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Layer 1: Slow Movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    x: useTransform(mouseX, [0, 1], [-20, 20]),
                    y: useTransform(mouseY, [0, 1], [-20, 20])
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <div
                        key={`layer1-${i}`}
                        className="absolute text-pink-100 opacity-50"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random() * 0.5 + 0.5})`
                        }}
                    >
                        <Heart size={Math.random() * 60 + 40} fill="currentColor" />
                    </div>
                ))}
            </motion.div>

            {/* Layer 2: Medium Movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    x: useTransform(mouseX, [0, 1], [-50, 50]),
                    y: useTransform(mouseY, [0, 1], [-50, 50])
                }}
            >
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`layer2-${i}`}
                        className="absolute text-rose-100 opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random() * 0.5 + 0.3})`
                        }}
                    >
                        <Heart size={Math.random() * 40 + 20} fill="currentColor" />
                    </div>
                ))}
            </motion.div>

            {/* Layer 3: Fast Movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    x: useTransform(mouseX, [0, 1], [-80, 80]),
                    y: useTransform(mouseY, [0, 1], [-80, 80])
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <div
                        key={`layer3-${i}`}
                        className="absolute text-rose-200 opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    >
                        <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ParallaxBackground;
