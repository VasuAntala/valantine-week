import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

// Helper to get icon based on index or type
const getIcon = (index) => {
    const icons = [Heart, Calendar, Heart, MapPin];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6" fill={index % 2 === 0 ? "currentColor" : "none"} />;
};

const TimelineItem = ({ item, index }) => {
    return (
        <motion.div
            className={`flex items-center gap-8 mb-16 w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-pink-100 max-w-md">
                    <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
                        {getIcon(index)}
                        <span>{item.year || item.date}</span>
                    </div>
                    <h3 className="text-2xl font-display text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
            </div>

            <div className="relative">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 relative">
                    <Heart className="w-6 h-6" fill="currentColor" />
                </div>
                {/* Connector Line */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-pink-200 -z-0" />
            </div>

            <div className="w-1/2" />
        </motion.div>
    );
};

const Timeline = () => {
    const { config } = useConfig();
    const milestones = config.timelineEvents;

    return (
        <div className="max-w-4xl mx-auto py-12 relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-100 top-0 -z-10" />

            <div className="space-y-4">
                {milestones.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
