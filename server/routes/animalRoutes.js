import express from 'express';
import {
    getAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
} from '../controllers/animalController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAnimals)
    .post(protect, admin, createAnimal);

router.route('/:id')
    .get(getAnimalById)
    .put(protect, admin, updateAnimal)
    .delete(protect, admin, deleteAnimal);

export default router;
