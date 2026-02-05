import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, Image as ImageIcon, Heart, Calendar, Music } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const EditModal = ({ isOpen, onClose }) => {
    const { config, updateConfig } = useConfig();
    const [activeTab, setActiveTab] = useState('general');
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [tempUrl, setTempUrl] = useState("");

    // Tabs Configuration
    const tabs = [
        { id: 'general', label: 'General', icon: <Heart size={16} /> },
        { id: 'timeline', label: 'Timeline', icon: <Calendar size={16} /> },
        { id: 'music', label: 'Music', icon: <Music size={16} /> },
        { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={16} /> },
        { id: 'reasons', label: 'Reasons', icon: <Heart size={16} /> },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white w-full max-w-4xl h-[90vh] md:h-[80vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-rose-100 m-4"
            >
                {/* Sidebar / Tabs */}
                <div className="w-full md:w-1/4 bg-rose-50 border-b md:border-b-0 md:border-r border-rose-100 p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0">
                    <h2 className="hidden md:block text-xl font-display text-rose-600 mb-6 px-2">Customize 💖</h2>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl text-center md:text-left transition-colors whitespace-nowrap md:whitespace-normal ${activeTab === tab.id
                                ? 'bg-rose-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-rose-100'
                                }`}
                        >
                            {tab.icon}
                            <span className="text-sm md:text-base font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col h-full bg-white relative">

                    {/* CUSTOM URL MODAL OVERLAY */}
                    <AnimatePresence>
                        {showUrlInput && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                            >
                                <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
                                    <h3 className="text-lg font-bold text-gray-800">Add Image URL 🔗</h3>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={tempUrl}
                                        onChange={(e) => setTempUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-100 focus:border-rose-500 outline-none transition-colors"
                                    />
                                    <div className="flex gap-3 justify-end">
                                        <button
                                            onClick={() => {
                                                setShowUrlInput(false);
                                                setTempUrl("");
                                            }}
                                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (tempUrl) {
                                                    updateConfig('galleryImages', [...config.galleryImages, tempUrl]);
                                                    setShowUrlInput(false);
                                                    setTempUrl("");
                                                }
                                            }}
                                            className="px-6 py-2 bg-rose-500 text-white rounded-lg font-bold shadow-md hover:bg-rose-600 transition-colors"
                                        >
                                            Add Photo
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{activeTab} Settings</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                                    <input
                                        type="text"
                                        value={config.recipientName}
                                        onChange={(e) => updateConfig('recipientName', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                        placeholder="e.g. Mansi"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Updates the "Happy Valentine's Day [Name]" text.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship Start Date</label>
                                    <input
                                        type="date"
                                        value={config.startDate.split('T')[0]}
                                        onChange={(e) => updateConfig('startDate', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Used for the relationship timer.</p>
                                </div>
                            </div>
                        )}

                        {/* TIMELINE TAB */}
                        {activeTab === 'timeline' && (
                            <div className="space-y-6">
                                {config.timelineEvents.map((event, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                                        <button
                                            onClick={() => {
                                                const newEvents = config.timelineEvents.filter((_, i) => i !== index);
                                                updateConfig('timelineEvents', newEvents);
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-white text-red-500 rounded-md shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Year/Date</label>
                                                <input
                                                    type="text"
                                                    value={event.year}
                                                    onChange={(e) => {
                                                        const newEvents = [...config.timelineEvents];
                                                        newEvents[index].year = e.target.value;
                                                        updateConfig('timelineEvents', newEvents);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={event.title}
                                                    onChange={(e) => {
                                                        const newEvents = [...config.timelineEvents];
                                                        newEvents[index].title = e.target.value;
                                                        updateConfig('timelineEvents', newEvents);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                                            <textarea
                                                value={event.description}
                                                onChange={(e) => {
                                                    const newEvents = [...config.timelineEvents];
                                                    newEvents[index].description = e.target.value;
                                                    updateConfig('timelineEvents', newEvents);
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm min-h-[60px]"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        updateConfig('timelineEvents', [
                                            ...config.timelineEvents,
                                            { year: "2024", title: "New Memory", description: "What happened?" }
                                        ]);
                                    }}
                                    className="w-full py-3 border-2 border-dashed border-rose-300 text-rose-500 rounded-xl font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> Add Milestone
                                </button>
                            </div>
                        )}

                        {/* GALLERY TAB */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-6">
                                <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                                    Tip: Use URLs from Unsplash, or upload photos from your device.
                                </p>
                                {config.galleryImages.map((url, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <input
                                            type="text"
                                            value={url.startsWith('data:') ? 'Image uploaded from device' : url}
                                            readOnly={url.startsWith('data:')}
                                            onChange={(e) => {
                                                const newImages = [...config.galleryImages];
                                                newImages[index] = e.target.value;
                                                updateConfig('galleryImages', newImages);
                                            }}
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm"
                                        />
                                        <button
                                            onClick={() => {
                                                const newImages = config.galleryImages.filter((_, i) => i !== index);
                                                updateConfig('galleryImages', newImages);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowUrlInput(true)}
                                        className="flex-1 py-3 border-2 border-dashed border-rose-300 text-rose-500 rounded-xl font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus size={20} /> Add URL
                                    </button>

                                    <label className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md">
                                        <ImageIcon size={20} /> Upload Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        updateConfig('galleryImages', [...config.galleryImages, reader.result]);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* MUSIC TAB */}
                        {activeTab === 'music' && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800">
                                    <p className="font-bold mb-1">Supported Formats:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>YouTube Links (e.g. https://youtu.be/...)</li>
                                        <li>SoundCloud Links</li>
                                        <li>MP3 / Audio Files</li>
                                    </ul>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Music URL</label>
                                    <input
                                        type="text"
                                        value={config.musicUrl || ""}
                                        onChange={(e) => updateConfig('musicUrl', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                        placeholder="Paste a YouTube or MP3 link here..."
                                    />
                                    <p className="text-xs text-gray-500 mt-2">The music will play when the vinyl player is clicked.</p>
                                </div>
                            </div>
                        )}

                        {/* REASONS TAB */}
                        {activeTab === 'reasons' && (
                            <div className="space-y-4">
                                {config.jarReasons.map((reason, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={reason}
                                            onChange={(e) => {
                                                const newReasons = [...config.jarReasons];
                                                newReasons[index] = e.target.value;
                                                updateConfig('jarReasons', newReasons);
                                            }}
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm"
                                        />
                                        <button
                                            onClick={() => {
                                                const newReasons = config.jarReasons.filter((_, i) => i !== index);
                                                updateConfig('jarReasons', newReasons);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => updateConfig('jarReasons', [...config.jarReasons, "New reason I love you..."])}
                                    className="w-full py-3 border-2 border-dashed border-rose-300 text-rose-500 rounded-xl font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> Add Reason
                                </button>
                            </div>
                        )}

                    </div>
                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all flex items-center gap-2"
                        >
                            <Save size={18} /> Done
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EditModal;
