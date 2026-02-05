import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createDefaultUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if users already exist
        const existingUsers = await User.countDocuments();

        if (existingUsers > 0) {
            console.log('⚠️  Users already exist. Skipping creation.');
            console.log('💡 To recreate users, delete them from MongoDB first.');
            process.exit(0);
        }

        // Create admin user
        const admin = new User({
            username: 'admin',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin',
            name: 'You'
        });
        await admin.save();
        console.log('✅ Admin user created');

        // Create valentine user
        const valentine = new User({
            username: 'valentine',
            password: process.env.VALENTINE_PASSWORD || 'love2024',
            role: 'recipient',
            name: 'Your Valentine'
        });
        await valentine.save();
        console.log('✅ Valentine user created');

        console.log('\n🎉 Users created successfully!');
        console.log('\n📝 Login credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:');
        console.log(`  Username: admin`);
        console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        console.log('\nValentine:');
        console.log(`  Username: valentine`);
        console.log(`  Password: ${process.env.VALENTINE_PASSWORD || 'love2024'}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating users:', error);
        process.exit(1);
    }
};

createDefaultUsers();
