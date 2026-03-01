import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    scientificName: { type: String },
    category: {
        type: String,
        enum: ['Mammals', 'Birds', 'Fish', 'Reptiles', 'Amphibians'],
        required: true
    },
    habitat: { type: String },
    diet: { type: String },
    lifespan: { type: String },
    activeTime: { type: String }, // New
    weight: { type: String }, // New
    height: { type: String }, // New
    conservationStatus: { type: String }, // e.g., Endangered, Least Concern
    image: { type: String, required: true },
    funFacts: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Animal = mongoose.model('Animal', animalSchema);
export default Animal;
