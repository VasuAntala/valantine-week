import React from 'react';
import { motion } from 'framer-motion';

import { useConfig } from '../context/ConfigContext';

const Gallery = () => {
    const { config } = useConfig();
    const images = config.galleryImages;
    return (
        <section className="py-20 w-full overflow-hidden bg-black/5">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-display text-rose-600 mb-4">Our Memory Reel</h2>
                <p className="text-gray-600">A cinematic journey through our moments...</p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-pink-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pink-50 to-transparent z-10" />

                <motion.div
                    className="flex gap-8 px-8 py-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                    whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion handles pause differently, simpler to use hover on children to scale
                >
                    {/* Double the images to create seamless loop */}
                    {[...images, ...images].map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] shrink-0 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-black cursor-pointer group"
                            whileHover={{ scale: 1.1, zIndex: 10, rotate: 0 }}
                            initial={{ rotate: index % 2 === 0 ? 1 : -1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={src}
                                alt={`Memory ${index}`}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />

                            {/* Film Strip Holes Decoration (Optional visual flair) */}
                            <div className="absolute top-0 w-full h-4 bg-black/50 flex justify-between px-2 gap-2">
                                {[...Array(10)].map((_, i) => <div key={i} className="w-2 h-2 bg-white/20 rounded-full my-1" />)}
                            </div>
                            <div className="absolute bottom-0 w-full h-4 bg-black/50 flex justify-between px-2 gap-2">
                                {[...Array(10)].map((_, i) => <div key={i} className="w-2 h-2 bg-white/20 rounded-full my-1" />)}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-display text-2xl drop-shadow-md">Moment #{index % images.length + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
