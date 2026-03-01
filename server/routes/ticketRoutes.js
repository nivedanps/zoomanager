import express from 'express';
import { bookTicket, getMyTickets, getTickets } from '../controllers/ticketController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, bookTicket)
    .get(protect, admin, getTickets);

router.route('/my').get(protect, getMyTickets);

export default router;
