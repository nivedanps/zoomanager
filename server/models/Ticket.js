import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['Adult', 'Child', 'Student', 'Senior'],
        required: true
    },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    count: { type: Number, default: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled', 'visited'], default: 'booked' },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
