import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import EditModal from './EditModal';
import { motion } from 'framer-motion';

const EditButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ rotate: 90 }}
                onClick={() => setIsModalOpen(true)}
                className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-rose-100 text-stone-600 hover:text-rose-600 transition-colors group"
                title="Customize Site"
            >
                <Settings size={24} />
            </motion.button>

            <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default EditButton;
