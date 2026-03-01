import express from 'express';
import { submitFeedback, getFeedback, updateFeedbackStatus } from '../controllers/feedbackController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(submitFeedback)
    .get(protect, admin, getFeedback);

router.route('/:id')
    .put(protect, admin, updateFeedbackStatus);

export default router;
