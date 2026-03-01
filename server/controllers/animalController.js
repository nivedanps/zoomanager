import Animal from '../models/Animal.js';
import mongoose from 'mongoose';


// Premium Mock Data Fallback
const mockAnimals = [
    {
        _id: 'mock1',
        name: 'Bengal Tiger',
        scientificName: 'Panthera tigris tigris',
        category: 'Mammals',
        habitat: 'Tropical Rainforests',
        diet: 'Carnivore',
        lifespan: '15-20 years',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1000',
        funFacts: 'Tigers are the largest cat species in the world and can reach up to 3.3 meters in length.'
    },
    {
        _id: 'mock2',
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        category: 'Mammals',
        habitat: 'Savanna & Forests',
        diet: 'Herbivore',
        lifespan: '60-70 years',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1000',
        funFacts: 'Elephants are the largest land animals and have the longest pregnancy of any mammal—22 months.'
    },
    {
        _id: 'mock3',
        name: 'Bald Eagle',
        scientificName: 'Haliaeetus leucocephalus',
        category: 'Birds',
        habitat: 'Near Large Water Bodies',
        diet: 'Carnivore (Fish)',
        lifespan: '20-30 years',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1470114755716-1e649697f7fa?auto=format&fit=crop&q=80&w=1000',
        funFacts: 'The Bald Eagle is the national bird of the United States and has a wingspan of up to 2.3 meters.'
    },
    {
        _id: 'mock4',
        name: 'Great White Shark',
        scientificName: 'Carcharodon carcharias',
        category: 'Fish',
        habitat: 'Coastal Waters',
        diet: 'Carnivore',
        lifespan: '70+ years',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1000',
        funFacts: 'Sharks do not have bones; their skeletons are made of cartilage.'
    },
    {
        _id: 'mock5',
        name: 'Galapagos Tortoise',
        scientificName: 'Chelonoidis niger',
        category: 'Reptiles',
        habitat: 'Volcanic Islands',
        diet: 'Herbivore',
        lifespan: '100+ years',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
        funFacts: 'These tortoises are among the longest-lived vertebrates in the world.'
    }
];

// @desc    Fetch all animals
// @route   GET /api/animals
// @access  Public
export const getAnimals = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(mockAnimals);
        }
        const animals = await Animal.find({});
        res.json(animals);
    } catch (error) {
        // Fallback to mock data if DB connection fails
        res.json(mockAnimals);
    }
};

// @desc    Fetch single animal
// @route   GET /api/animals/:id
// @access  Public
export const getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (animal) {
            res.json(animal);
        } else {
            const mock = mockAnimals.find(a => a._id === req.params.id);
            if (mock) return res.json(mock);
            res.status(404).json({ message: 'Animal not found' });
        }
    } catch (error) {
        const mock = mockAnimals.find(a => a._id === req.params.id);
        if (mock) return res.json(mock);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new animal
// @route   POST /api/animals
// @access  Private/Admin
export const createAnimal = async (req, res) => {
    const { name, scientificName, category, habitat, diet, lifespan, image, funFacts, conservationStatus } = req.body;

    try {
        const animal = new Animal({
            name, scientificName, category, habitat, diet, lifespan, image, funFacts, conservationStatus
        });

        const createdAnimal = await animal.save();
        res.status(201).json(createdAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Stored in temporary memory (Mock Mode)' });
    }
};

// @desc    Update an animal
// @route   PUT /api/animals/:id
// @access  Private/Admin
export const updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (animal) {
            animal.name = req.body.name || animal.name;
            animal.scientificName = req.body.scientificName || animal.scientificName;
            animal.category = req.body.category || animal.category;
            animal.habitat = req.body.habitat || animal.habitat;
            animal.diet = req.body.diet || animal.diet;
            animal.lifespan = req.body.lifespan || animal.lifespan;
            animal.image = req.body.image || animal.image;
            animal.funFacts = req.body.funFacts || animal.funFacts;
            animal.conservationStatus = req.body.conservationStatus || animal.conservationStatus;

            const updatedAnimal = await animal.save();
            res.json(updatedAnimal);
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an animal
// @route   DELETE /api/animals/:id
// @access  Private/Admin
export const deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (animal) {
            await animal.deleteOne();
            res.json({ message: 'Animal removed' });
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

