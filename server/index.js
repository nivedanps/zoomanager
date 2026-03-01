import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import vacancyRoutes from './routes/vacancyRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.warn('⚠️ MongoDB Connectivity Issue Detected');
        console.warn('🚀 Sanctuary Mode: Application is running in Bio-Locked Preview Mode (Mock Storage active)');
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/vacancies', vacancyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Zoo Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
