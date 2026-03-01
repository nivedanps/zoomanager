import express from 'express';
import { getGallery, uploadImage, deleteImage } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getGallery)
    .post(protect, admin, uploadImage);

router.route('/:id')
    .delete(protect, admin, deleteImage);

export default router;
