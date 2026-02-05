import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Notification from './models/Notification.js';
import UserPresence from './models/UserPresence.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

// Track connected users
const connectedUsers = new Map();

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // Handle user joining with type (admin or recipient)
    socket.on('user:join', async (userType) => {
        try {
            connectedUsers.set(socket.id, userType);

            // Save to database
            await UserPresence.findOneAndUpdate(
                { socketId: socket.id },
                { socketId: socket.id, userType, isOnline: true, lastSeen: new Date() },
                { upsert: true, new: true }
            );

            // Emit presence update to all clients
            const adminOnline = Array.from(connectedUsers.values()).includes('admin');
            const recipientOnline = Array.from(connectedUsers.values()).includes('recipient');

            io.emit('presence:update', { adminOnline, recipientOnline });

            console.log(`✅ ${userType} joined`);
        } catch (error) {
            console.error('Error saving user presence:', error);
        }
    });

    // Handle "Thinking of You" notification
    socket.on('notification:thinking', async (data) => {
        try {
            const senderType = data.userType || 'someone';
            const senderName = senderType === 'admin' ? 'Your love' : 'Your Valentine';
            const message = `${senderName} is thinking of you! 💖`;

            const notification = await Notification.create({
                type: 'thinking_of_you',
                message: message,
            });

            // Broadcast to all clients except sender
            socket.broadcast.emit('notification:received', {
                type: 'thinking_of_you',
                message: notification.message,
                sender: senderType,
                timestamp: notification.createdAt
            });

            console.log(`💭 Thinking of you notification sent from ${senderType}`);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    });

    // Handle "Yes" button click
    socket.on('notification:yes-clicked', async () => {
        try {
            const notification = await Notification.create({
                type: 'yes_clicked',
                message: '🎉 She said YES! Best decision ever!',
            });

            // Broadcast to all clients EXCEPT sender
            socket.broadcast.emit('notification:received', {
                type: 'yes_clicked',
                message: notification.message,
                timestamp: notification.createdAt
            });

            console.log('💝 YES notification sent');
        } catch (error) {
            console.error('Error sending yes notification:', error);
        }
    });

    // Handle synchronized playback events
    socket.on('player:play', (data) => {
        console.log('▶️  Play event from', connectedUsers.get(socket.id), 'at', data.playedSeconds);
        socket.broadcast.emit('player:play', {
            playedSeconds: data.playedSeconds,
            timestamp: Date.now()
        });
    });

    socket.on('player:pause', (data) => {
        console.log('⏸️  Pause event from', connectedUsers.get(socket.id), 'at', data.playedSeconds);
        socket.broadcast.emit('player:pause', {
            playedSeconds: data.playedSeconds,
            timestamp: Date.now()
        });
    });

    socket.on('player:seek', (data) => {
        console.log('⏩ Seek event from', connectedUsers.get(socket.id), 'to', data.playedSeconds);
        socket.broadcast.emit('player:seek', {
            playedSeconds: data.playedSeconds,
            timestamp: Date.now()
        });
    });

    socket.on('player:sync-request', () => {
        // Request current playback state from other connected users
        socket.broadcast.emit('player:sync-request');
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        try {
            const userType = connectedUsers.get(socket.id);
            connectedUsers.delete(socket.id);

            // Update database
            await UserPresence.findOneAndUpdate(
                { socketId: socket.id },
                { isOnline: false, lastSeen: new Date() }
            );

            // Emit presence update
            const adminOnline = Array.from(connectedUsers.values()).includes('admin');
            const recipientOnline = Array.from(connectedUsers.values()).includes('recipient');

            io.emit('presence:update', { adminOnline, recipientOnline });

            console.log(`👋 ${userType || 'User'} disconnected:`, socket.id);
        } catch (error) {
            console.error('Error handling disconnect:', error);
        }
    });
});

// REST API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Valentine Backend is running! ❤️' });
});

// Get all notifications
app.get('/api/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark notification as read
app.patch('/api/notifications/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`💖 Backend ready for real-time magic!`);
});
