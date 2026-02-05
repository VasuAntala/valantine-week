import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { useConfig } from '../context/ConfigContext';
import socket from '../services/socket';

const MusicPlayer = () => {
    const { config } = useConfig();
    const [isPlaying, setIsPlaying] = useState(false); // Always start paused
    const [isReady, setIsReady] = useState(false);
    const playerRef = useRef(null);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        // Listen for remote play events
        socket.on('player:play', (data) => {
            console.log('🎵 Remote play command received at', data.playedSeconds);
            setIsSyncing(true);
            if (playerRef.current) {
                playerRef.current.seekTo(data.playedSeconds, 'seconds');
            }
            setIsPlaying(true);
            setTimeout(() => setIsSyncing(false), 100);
        });

        // Listen for remote pause events
        socket.on('player:pause', (data) => {
            console.log('⏸️  Remote pause command received at', data.playedSeconds);
            setIsSyncing(true);
            if (playerRef.current) {
                playerRef.current.seekTo(data.playedSeconds, 'seconds');
            }
            setIsPlaying(false);
            setTimeout(() => setIsSyncing(false), 100);
        });

        // Listen for remote seek events
        socket.on('player:seek', (data) => {
            console.log('⏩ Remote seek to', data.playedSeconds);
            setIsSyncing(true);
            if (playerRef.current) {
                playerRef.current.seekTo(data.playedSeconds, 'seconds');
            }
            setTimeout(() => setIsSyncing(false), 100);
        });

        return () => {
            socket.off('player:play');
            socket.off('player:pause');
            socket.off('player:seek');
        };
    }, []);

    const togglePlay = () => {
        if (!isReady || isSyncing) return;

        const newPlayingState = !isPlaying;
        setIsPlaying(newPlayingState);

        // Get current playback position
        const currentTime = playerRef.current?.getCurrentTime() || 0;

        // Emit to other users
        if (newPlayingState) {
            socket.emit('player:play', { playedSeconds: currentTime });
        } else {
            socket.emit('player:pause', { playedSeconds: currentTime });
        }
    };


    return (
        <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex flex-col items-start gap-3 md:gap-4">
            {/* Visible Video Player (Mini) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-900 w-32 md:w-56"
            >
                <div className="aspect-video relative flex items-center justify-center">
                    {/* Placeholder for Audio-Only / Loading / Not Ready */}
                    {(!isReady || !isPlaying) && (
                        <div className="absolute inset-0 flex items-center justify-center gap-1 z-20 pointer-events-none">
                            <motion.div animate={{ height: [10, 20, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-4 bg-rose-500 rounded-full" />
                            <motion.div animate={{ height: [25, 10, 25] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-8 bg-rose-400 rounded-full" />
                            <motion.div animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 h-4 bg-rose-500 rounded-full" />
                            <motion.div animate={{ height: [15, 5, 15] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1.5 h-6 bg-rose-400 rounded-full" />
                        </div>
                    )}

                    <ReactPlayer
                        ref={playerRef}
                        url={config.musicUrl}
                        playing={isPlaying}
                        loop={true}
                        volume={0.8}
                        width="100%"
                        height="100%"
                        style={{ position: 'relative', zIndex: 10 }}
                        onReady={() => setIsReady(true)}
                        onPlay={() => {
                            if (!isSyncing) setIsPlaying(true);
                        }}
                        onPause={() => {
                            if (!isSyncing) setIsPlaying(false);
                        }}
                        onError={(e) => {
                            console.log("Player Error suppressed:", e);
                            setIsPlaying(false);
                        }}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0, controls: 1, modestbranding: 1 }
                            },
                            file: {
                                attributes: { preload: 'auto' }
                            }
                        }}
                    />
                </div>
            </motion.div>

            {/* Vinyl Record Player UI */}
            <div className="relative group">
                <motion.div
                    className="relative w-24 h-24 md:w-40 md:h-40 cursor-pointer"
                    onClick={togglePlay}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Vinyl Disc */}
                    <motion.div
                        className={`w-full h-full rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center relative overflow-hidden`}
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Vinyl Grooves */}
                        <div className="absolute inset-2 rounded-full border border-gray-700 opacity-50" />
                        <div className="absolute inset-4 rounded-full border border-gray-700 opacity-50" />
                        <div className="absolute inset-8 rounded-full border border-gray-700 opacity-50" />

                        {/* Center Label */}
                        <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center z-10 border-2 border-white">
                            <Disc size={20} className="text-white" />
                        </div>
                    </motion.div>

                    {/* Play/Pause Overlay Center */}
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        {isPlaying ? <Pause className="text-white w-10 h-10" /> : <Play className="text-white w-10 h-10 ml-1" />}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MusicPlayer;
