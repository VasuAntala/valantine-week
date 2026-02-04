import React, { createContext, useState, useEffect, useContext } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
    // Default Initial State
    const defaultState = {
        recipientName: "Mansi",
        startDate: "2023-02-14",
        timelineEvents: [
            { year: "2023", title: "First Hello", description: "The day our paths crossed and everything changed." },
            { year: "2023", title: "First Date", description: "Coffee, nervous laughter, and a spark." },
            { year: "2024", title: "She Said Yes", description: "The moment you made me the happiest person alive." },
            { year: "2025", title: "Adventures", description: "Traveling, exploring, and making memories together." },
        ],
        galleryImages: [
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=700&fit=crop",
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500&h=700&fit=crop",
            "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1506543730-1cfa856e7371?w=500&h=700&fit=crop",
        ],
        jarReasons: [
            "Your smile lights up my world.",
            "You make the best coffee.",
            "How you look at me.",
            "Your laugh is my favorite sound.",
            "You inspire me every day.",
            "Your kindness knows no bounds.",
            "You are my safe place.",
            "The way you hug me.",
        ],
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    };

    // Load from localStorage or use default
    const [config, setConfig] = useState(() => {
        const savedConfig = localStorage.getItem('valentineConfig');
        return savedConfig ? { ...defaultState, ...JSON.parse(savedConfig) } : defaultState;
    });

    // Save to localStorage whenever config changes
    useEffect(() => {
        localStorage.setItem('valentineConfig', JSON.stringify(config));
    }, [config]);

    const updateConfig = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const resetConfig = () => {
        setConfig(defaultState);
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
