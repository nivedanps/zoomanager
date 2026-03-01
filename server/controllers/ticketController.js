import Ticket from '../models/Ticket.js';

// @desc    Book a new ticket
// @route   POST /api/tickets
// @access  Private
export const bookTicket = async (req, res) => {
    const { type, date, price, count, totalAmount } = req.body;

    try {
        const ticket = new Ticket({
            user: req.user._id,
            type,
            date,
            price,
            count,
            totalAmount
        });

        const createdTicket = await ticket.save();
        res.status(201).json(createdTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user tickets
// @route   GET /api/tickets/my
// @access  Private
export const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tickets (Admin)
// @route   GET /api/tickets
// @access  Private/Admin
export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).populate('user', 'id name email');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
