import Vacancy from '../models/Vacancy.js';
import mongoose from 'mongoose';
import { vacancies as mockVacancies } from '../data/mockData.js';

// @desc    Get all vacancies
// @route   GET /api/vacancies
// @access  Public
export const getVacancies = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(mockVacancies);
        }
        const vacancies = await Vacancy.find({}).sort({ postedAt: -1 });
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a vacancy
// @route   POST /api/vacancies
// @access  Private/Admin
export const createVacancy = async (req, res) => {
    const { title, description, type, eligibility, salary } = req.body;

    try {
        const vacancy = new Vacancy({
            title, description, type, eligibility, salary
        });

        const createdVacancy = await vacancy.save();
        res.status(201).json(createdVacancy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a vacancy
// @route   POST /api/vacancies/:id/apply
// @access  Public
export const applyForVacancy = async (req, res) => {
    const { name, email, resume } = req.body;

    try {
        const vacancy = await Vacancy.findById(req.params.id);

        if (vacancy) {
            const alreadyApplied = vacancy.applicants.find(applicant => applicant.email === email);

            if (alreadyApplied) {
                return res.status(400).json({ message: 'You have already applied for this job' });
            }

            vacancy.applicants.push({ name, email, resume });
            await vacancy.save();
            res.json({ message: 'Application submitted successfully' });
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a vacancy
// @route   DELETE /api/vacancies/:id
// @access  Private/Admin
export const deleteVacancy = async (req, res) => {
    try {
        const vacancy = await Vacancy.findById(req.params.id);

        if (vacancy) {
            await vacancy.deleteOne();
            res.json({ message: 'Vacancy removed' });
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
