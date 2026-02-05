import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Create socket connection
const socket = io(SOCKET_URL, {
    autoConnect: false, // We'll connect manually
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
});

// Connection event listeners
socket.on('connect', () => {
    console.log('✅ Connected to backend:', socket.id);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from backend');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
});

export default socket;
