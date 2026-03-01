
// Helper to generate variations
const generateVariations = (baseAnimals, targetCount) => {
    let result = [...baseAnimals];
    let multiplier = 1;

    while (result.length < targetCount) {
        const batch = baseAnimals.map(animal => ({
            ...animal,
            name: `${animal.name} ${multiplier + 1}`,
            _id: `${animal._id || animal.name.replace(/\s+/g, '').toLowerCase()}_var_${multiplier}`,
            funFacts: `${animal.funFacts} (Specimen #${multiplier + 1})`
        }));
        result = [...result, ...batch];
        multiplier++;
    }
    return result.slice(0, targetCount);
};

const baseMammals = [
    {
        name: 'African Lion',
        scientificName: 'Panthera leo',
        category: 'Mammals',
        habitat: 'Savannah, Grasslands',
        diet: 'Carnivore (Wildebeest, Zebras)',
        lifespan: '10-14 years',
        activeTime: 'Nocturnal/Crepuscular',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Lions are the only cats that live in groups called prides.'
    },
    {
        name: 'Bengal Tiger',
        scientificName: 'Panthera tigris tigris',
        category: 'Mammals',
        habitat: 'Tropical Forests, Mangroves',
        diet: 'Carnivore (Deer, Boar)',
        lifespan: '8-10 years',
        activeTime: 'Nocturnal',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=800&q=80',
        funFacts: 'A tiger\'s roar can be heard as far as three kilometers away.'
    },
    {
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        category: 'Mammals',
        habitat: 'Savannah, Forests',
        diet: 'Herbivore (Grasses, Fruit, Bark)',
        lifespan: '60-70 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Elephants are the largest land animals in the world.'
    },
    {
        name: 'Giraffe',
        scientificName: 'Giraffa camelopardalis',
        category: 'Mammals',
        habitat: 'Savannah, Woodlands',
        diet: 'Herbivore (Acacia Leaves)',
        lifespan: '25 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=800&q=80',
        funFacts: 'A giraffe\'s tongue can be up to 45cm long to grasp leaves.'
    },
    {
        name: 'Gorilla',
        scientificName: 'Gorilla beringei',
        category: 'Mammals',
        habitat: 'Tropical Rainforests',
        diet: 'Herbivore (Bamboo, Fruit)',
        lifespan: '35-40 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Critically Endangered',
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Gorillas share 98% of their DNA with humans.'
    },
    {
        name: 'Koala',
        scientificName: 'Phascolarctos cinereus',
        category: 'Mammals',
        habitat: 'Eucalyptus Forests',
        diet: 'Herbivore (Eucalyptus Leaves)',
        lifespan: '13-18 years',
        activeTime: 'Nocturnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1540321285098-90f75727931f?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Koalas sleep up to 20 hours a day.'
    },
    {
        name: 'Red Panda',
        scientificName: 'Ailurus fulgens',
        category: 'Mammals',
        habitat: 'Temperate Forests',
        diet: 'Omnivore (Bamboo, Eggs, Insects)',
        lifespan: '23 years',
        activeTime: 'Crepuscular',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1548685121-f3b143d26b86?auto=format&fit=crop&w=800&q=80',
        funFacts: 'They use their bushy tails for balance and warmth.'
    },
    {
        name: 'Cheetah',
        scientificName: 'Acinonyx jubatus',
        category: 'Mammals',
        habitat: 'Savannah',
        diet: 'Carnivore (Gazelles, Impalas)',
        lifespan: '10-12 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1504006833117-8886a36a687c?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Cheetahs are the fastest land animals, reaching speeds of 112 km/h.'
    },
    {
        name: 'Polar Bear',
        scientificName: 'Ursus maritimus',
        category: 'Mammals',
        habitat: 'Arctic Ice',
        diet: 'Carnivore (Seals)',
        lifespan: '25-30 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Polar bear skin is black to absorb heat from the sun.'
    },
    {
        name: 'Kangaroo',
        scientificName: 'Macropus',
        category: 'Mammals',
        habitat: 'Australian Bushland',
        diet: 'Herbivore (Grass, Shrubs)',
        lifespan: '6-20 years',
        activeTime: 'Crepuscular',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1585848762744-8cb5d7363f0d?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Kangaroos cannot walk backwards.'
    }
];

const baseBirds = [
    {
        name: 'Bald Eagle',
        scientificName: 'Haliaeetus leucocephalus',
        category: 'Birds',
        habitat: 'Near Water Bodies',
        diet: 'Carnivore (Fish)',
        lifespan: '20 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1548681525-4fc93708a3d3?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Bald eagles build the largest nests of any North American bird.'
    },
    {
        name: 'Peacock',
        scientificName: 'Pavo cristatus',
        category: 'Birds',
        habitat: 'Forests, Farmlands',
        diet: 'Omnivore (Insects, Plants)',
        lifespan: '15-20 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1502621746206-8dce284e311a?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Only males have the colorful tail feathers (train).'
    },
    {
        name: 'Macaw',
        scientificName: 'Ara',
        category: 'Birds',
        habitat: 'Rainforests',
        diet: 'Herbivore (Nuts, Seeds)',
        lifespan: '50-60 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb8?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Macaws have bone-crushing beaks.'
    },
    {
        name: 'Penguin',
        scientificName: 'Spheniscidae',
        category: 'Birds',
        habitat: 'Antarctic Coasts',
        diet: 'Carnivore (Fish, Krill)',
        lifespan: '15-20 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Near Threatened',
        image: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Penguins are flightless birds but excellent swimmers.'
    },
    {
        name: 'Owl',
        scientificName: 'Strigiformes',
        category: 'Birds',
        habitat: 'Woodlands, Forests',
        diet: 'Carnivore (Mice, Insects)',
        lifespan: '10-25 years',
        activeTime: 'Nocturnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1579706307374-9844e1300067?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Owls can rotate their heads 270 degrees.'
    },
    {
        name: 'Flamingo',
        scientificName: 'Phoenicopterus',
        category: 'Birds',
        habitat: 'Lagoons, Mudflats',
        diet: 'Omnivore (Algae, Shrimp)',
        lifespan: '20-30 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Flamingos get their pink color from the food they eat.'
    }
];

const baseReptiles = [
    {
        name: 'King Cobra',
        scientificName: 'Ophiophagus hannah',
        category: 'Reptiles',
        habitat: 'Plains, Rainforests',
        diet: 'Carnivore (Other Snakes)',
        lifespan: '20 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1531386816498-98e15f089288?auto=format&fit=crop&w=800&q=80',
        funFacts: 'King Cobras are the longest venomous snakes in the world.'
    },
    {
        name: 'Komodo Dragon',
        scientificName: 'Varanus komodoensis',
        category: 'Reptiles',
        habitat: 'Islands',
        diet: 'Carnivore (Deer, Pigs)',
        lifespan: '30 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1535083252457-6080fe29be45?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Komodo dragons have venom glands, not just bacteria in their mouths.'
    },
    {
        name: 'Green Sea Turtle',
        scientificName: 'Chelonia mydas',
        category: 'Reptiles',
        habitat: 'Oceans, Beaches',
        diet: 'Herbivore (Seagrass)',
        lifespan: '80+ years',
        activeTime: 'Diurnal',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1583341617255-a50269377a06?auto=format&fit=crop&w=800&q=80',
        funFacts: 'They can hold their breath for up to 5 hours underwater.'
    },
    {
        name: 'Chameleon',
        scientificName: 'Chamaeleonidae',
        category: 'Reptiles',
        habitat: 'Rainforests, Deserts',
        diet: 'Carnivore (Insects)',
        lifespan: '5-10 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Chameleons can move their eyes independently of each other.'
    }
];

const baseAquatic = [
    {
        name: 'Clownfish',
        scientificName: 'Amphiprioninae',
        category: 'Aquatic',
        habitat: 'Coral Reefs',
        diet: 'Omnivore (Algae, Worms)',
        lifespan: '6-10 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Clownfish live in a symbiotic relationship with anemones.'
    },
    {
        name: 'Great White Shark',
        scientificName: 'Carcharodon carcharias',
        category: 'Aquatic',
        habitat: 'Coastal Waters',
        diet: 'Carnivore (Fish, Seals)',
        lifespan: '70 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Great white sharks never stop swimming.'
    },
    {
        name: 'Seahorse',
        scientificName: 'Hippocampus',
        category: 'Aquatic',
        habitat: 'Seagrass Beds',
        diet: 'Carnivore (Plankton)',
        lifespan: '1-5 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Vulnerable',
        image: 'https://images.unsplash.com/photo-1549488497-6a58eb752603?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Male seahorses carry the eggs and give birth to the babies.'
    },
    {
        name: 'Jellyfish',
        scientificName: 'Medusozoa',
        category: 'Aquatic',
        habitat: 'Oceans',
        diet: 'Carnivore (Fish, Plankton)',
        lifespan: '1 year',
        activeTime: 'Nocturnal/Diurnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Jellyfish have no brain, heart, or bones.'
    }
];

const baseAmphibians = [
    {
        name: 'Red-Eyed Tree Frog',
        scientificName: 'Agalychnis callidryas',
        category: 'Amphibians',
        habitat: 'Rainforests',
        diet: 'Carnivore (Insects)',
        lifespan: '5 years',
        activeTime: 'Nocturnal',
        conservationStatus: 'Least Concern',
        image: 'https://images.unsplash.com/photo-1596707328646-7c9c0d57181c?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Their bright colors startle predators.'
    },
    {
        name: 'Axolotl',
        scientificName: 'Ambystoma mexicanum',
        category: 'Amphibians',
        habitat: 'Lakes',
        diet: 'Carnivore (Worms, Fish)',
        lifespan: '10-15 years',
        activeTime: 'Nocturnal',
        conservationStatus: 'Critically Endangered',
        image: 'https://images.unsplash.com/photo-1549463994-39f50682245b?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Axolotls can regenerate lost limbs.'
    },
    {
        name: 'Poison Dart Frog',
        scientificName: 'Dendrobatidae',
        category: 'Amphibians',
        habitat: 'Rainforests',
        diet: 'Carnivore (Insects)',
        lifespan: '3-15 years',
        activeTime: 'Diurnal',
        conservationStatus: 'Endangered',
        image: 'https://images.unsplash.com/photo-1550262174-8b634812f8e2?auto=format&fit=crop&w=800&q=80',
        funFacts: 'Their poison comes from the ants they eat.'
    }
];

// Generate 100+ per category
export const animals = [
    ...generateVariations(baseMammals, 100),
    ...generateVariations(baseBirds, 100),
    ...generateVariations(baseReptiles, 100),
    ...generateVariations(baseAquatic, 100),
    ...generateVariations(baseAmphibians, 100)
];

export const events = [
    {
        title: 'Lion Feeding Session',
        description: 'Watch our zookeepers feed the lions and learn about their diet and hunting habits. A thrilling experience for all ages.',
        date: new Date(Date.now() + 86400000).toISOString(),
        time: '10:00 AM',
        location: 'Lion Enclosure',
        capacity: 50,
        image: 'https://images.unsplash.com/photo-1615818499660-30bb528b3464?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Dolphin Show',
        description: 'Experience the agility and intelligence of our dolphins in this spectacular aquatic show.',
        date: new Date(Date.now() + 172800000).toISOString(),
        time: '02:00 PM',
        location: 'Aquatic Center',
        capacity: 200,
        image: 'https://images.unsplash.com/photo-1565158654215-680f58a74191?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Reptile Encounter',
        description: 'Get up close and personal with some of our friendliest reptiles. Safe and educational.',
        date: new Date(Date.now() + 259200000).toISOString(),
        time: '11:30 AM',
        location: 'Reptile House',
        capacity: 20,
        image: 'https://images.unsplash.com/photo-1533568727546-d8d5df5e7ec9?auto=format&fit=crop&w=800&q=80'
    }
];

export const vacancies = [
    {
        title: 'Senior Zookeeper',
        type: 'Full-time',
        salary: '₹45,000 - ₹60,000/mo',
        description: 'We are looking for an experienced zookeeper to lead our mammal care team. Must have 5+ years of experience.',
        eligibility: 'B.Sc in Zoology or related field'
    },
    {
        title: 'Veterinary Technician',
        type: 'Part-time',
        salary: '₹25,000 - ₹35,000/mo',
        description: 'Assist our vet team in routine checkups and emergency care procedures.',
        eligibility: 'Certified Vet Tech'
    },
    {
        title: 'Animal Nutritionist',
        type: 'Contract',
        salary: '₹50,000/mo',
        description: 'Design diet plans for our diverse range of species ensuring optimal health.',
        eligibility: 'M.Sc in Animal Nutrition'
    }
];
