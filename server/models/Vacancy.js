import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
    eligibility: { type: String, required: true },
    salary: { type: String },
    postedAt: { type: Date, default: Date.now },
    applicants: [{
        name: String,
        email: String,
        resume: String, // URL to resume
        appliedAt: { type: Date, default: Date.now }
    }]
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);
export default Vacancy;
