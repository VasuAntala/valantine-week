import mongoose from 'mongoose';

const userPresenceSchema = new mongoose.Schema({
    socketId: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ['admin', 'recipient'],
        required: true
    },
    isOnline: {
        type: Boolean,
        default: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }
});

const UserPresence = mongoose.model('UserPresence', userPresenceSchema);

export default UserPresence;
