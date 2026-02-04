import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

const Timer = () => {
    const { config } = useConfig();
    const startDate = config.startDate;
    const [timeLeft, setTimeLeft] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTime = () => {
            const start = new Date(startDate).getTime();
            const now = new Date().getTime();
            const difference = now - start;

            if (difference > 0) {
                const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
                const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ years, days, hours, minutes, seconds });
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();

        return () => clearInterval(timer);
    }, [startDate]);

    return (
        <section className="py-20 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-3xl md:text-5xl font-display text-rose-600 mb-8">Time We've Been In Love</h2>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-md min-w-[80px] md:min-w-[100px]">
                            <span className="text-3xl md:text-5xl font-bold text-rose-500 font-display">
                                {value.toString().padStart(2, '0')}
                            </span>
                            <span className="text-gray-600 uppercase text-xs md:text-sm tracking-widest mt-2">
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Timer;
