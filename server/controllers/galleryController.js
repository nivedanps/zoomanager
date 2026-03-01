import Gallery from '../models/Gallery.js';
import mongoose from 'mongoose';
import { animals } from '../data/mockData.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            // Derived mock gallery from mock animals
            const mockGallery = animals.slice(0, 20).map((animal, index) => ({
                _id: `gallery_${index}`,
                title: animal.name,
                category: 'Animals',
                imageUrl: animal.image
            }));
            return res.json(mockGallery);
        }
        const gallery = await Gallery.find({}).sort({ uploadedAt: -1 });
        res.json(gallery);
    } catch (error) {
        res.json([]);
    }
};

// @desc    Upload image to gallery
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadImage = async (req, res) => {
    const { title, category, imageUrl } = req.body;

    try {
        const galleryItem = new Gallery({
            title, category, imageUrl
        });

        const createdItem = await galleryItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteImage = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (item) {
            await item.deleteOne();
            res.json({ message: 'Image removed' });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
