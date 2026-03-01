import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Animal from './models/Animal.js';
import Event from './models/Event.js';
import Gallery from './models/Gallery.js';
import Vacancy from './models/Vacancy.js';
import { animals, events, vacancies } from './data/mockData.js';

dotenv.config();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const seedData = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('URI:', process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@')); // Log masked URI
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000 // Increase timeout
        });
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Animal.deleteMany({});
        await Event.deleteMany({});
        await Gallery.deleteMany({});
        await Vacancy.deleteMany({});

        // Create Admin
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@zoo.com',
            password: 'admin123', // Model handles hashing in pre-save
            role: 'admin',
            phone: '1234567890'
        });

        // Create Animals
        await Animal.insertMany(animals);

        // Create Gallery Items (using Animal images)
        const galleryItems = animals.map((animal, index) => ({
            title: animal.name,
            category: 'Animals', // Simple mapping
            imageUrl: animal.image
        })).slice(0, 20); // Just take first 20 for gallery

        await Gallery.insertMany(galleryItems);

        // Create Events
        await Event.insertMany(events);

        // Create Vacancies
        await Vacancy.insertMany(vacancies);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
