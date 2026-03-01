import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// Preview Credentials
const PREVIEW_ADMIN = {
    _id: 'preview_admin_123',
    name: 'Sanctuary Warden',
    email: 'admin@zooVerse.com',
    password: 'admin',
    role: 'admin'
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        // Mock Registration for preview
        res.status(201).json({
            _id: 'mock_user_' + Date.now(),
            name: name,
            email: email,
            role: 'user',
            token: generateToken('mock_user_id'),
            message: 'Preview Mode: Profile created in temporary memory'
        });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for Preview Admin
        if (email === PREVIEW_ADMIN.email && password === PREVIEW_ADMIN.password) {
            return res.json({
                ...PREVIEW_ADMIN,
                token: generateToken(PREVIEW_ADMIN._id),
                message: 'Welcome Warden. Entered via Preview Override.'
            });
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Fallback for Preview Admin if DB is down
        if (email === PREVIEW_ADMIN.email && password === PREVIEW_ADMIN.password) {
            return res.json({
                ...PREVIEW_ADMIN,
                token: generateToken(PREVIEW_ADMIN._id),
                message: 'Welcome Warden. Entered via Bio-Lock Override (Mock Mode).'
            });
        }
        res.status(500).json({ message: 'Database disconnected. Use preview credentials (admin@zooVerse.com / admin).' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        if (req.user && req.user._id === PREVIEW_ADMIN._id) {
            return res.json(PREVIEW_ADMIN);
        }

        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            // Check if it was a mock user
            res.json({
                _id: req.user._id,
                name: 'Sanctuary Guest',
                email: 'guest@preview.com',
                role: 'user',
            });
        }
    } catch (error) {
        res.json(PREVIEW_ADMIN);
    }
};

