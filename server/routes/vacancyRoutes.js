import express from 'express';
import { getVacancies, createVacancy, applyForVacancy, deleteVacancy } from '../controllers/vacancyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getVacancies)
    .post(protect, admin, createVacancy);

router.route('/:id')
    .delete(protect, admin, deleteVacancy);

router.post('/:id/apply', applyForVacancy);

export default router;
