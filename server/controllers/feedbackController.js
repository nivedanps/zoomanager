import Feedback from '../models/Feedback.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
export const submitFeedback = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const feedback = new Feedback({
            name, email, subject, message
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all feedback (Admin)
// @route   GET /api/feedback
// @access  Private/Admin
export const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({}).sort({ submittedAt: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update feedback status
// @route   PUT /api/feedback/:id
// @access  Private/Admin
export const updateFeedbackStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const feedback = await Feedback.findById(req.params.id);

        if (feedback) {
            feedback.status = status;
            await feedback.save();
            res.json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
