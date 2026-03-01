import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Info, MapPin, Heart, Share2, Sparkles, PawPrint } from 'lucide-react';

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Mammals', 'Birds', 'Fish', 'Reptiles', 'Amphibians'];

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/animals');
                setAnimals(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching animals:', error);
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);

    const filteredAnimals = animals.filter(animal => {
        const matchesCategory = filter === 'All' || animal.category === filter;
        const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-teal-500/20 border-t-teal-600 rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-teal-600 animate-pulse" />
                </div>
                <p className="mt-6 text-slate-500 font-bold tracking-widest uppercase text-xs">Initializing Discovery...</p>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-32 min-h-screen bg-slate-50 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-teal-100"
                    >
                        <Sparkles className="w-4 h-4" /> Comprehensive Bio-Repository
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6"
                    >
                        Wildlife <span className="text-teal-600">Encounters</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl text-slate-500 text-lg font-medium leading-relaxed"
                    >
                        Unveil the extraordinary diversity of our sanctuary. From majestic predators to crystalline aquatic life,
                        explore the inhabitants of our global bio-zones.
                    </motion.p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row gap-6 mb-16 px-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Identify species by name or taxonomy..."
                            className="glass-input !pl-16 !bg-white/80 border-slate-200 focus:!border-teal-500/30 w-full shadow-xl shadow-slate-200/50 py-5 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all border ${filter === cat
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/20'
                                        : 'bg-white border-slate-200 text-slate-500 hover:border-teal-500/30 hover:text-teal-600'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center gap-4 mb-10 px-4">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Showing {filteredAnimals.length} Catalogued Species
                    </span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAnimals.map((animal, index) => (
                            <motion.div
                                layout
                                key={animal._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-sky-500 rounded-[42px] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                                <div className="relative glass-card !bg-white/90 border-slate-100 overflow-hidden flex flex-col h-full shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 group-hover:-translate-y-2">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-lg">
                                                {animal.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                                            <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 hover:bg-teal-600 hover:text-white transition-all shadow-lg">
                                                <Heart className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 hover:bg-teal-600 hover:text-white transition-all shadow-lg">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{animal.name}</h3>
                                            <p className="text-sm font-bold italic text-teal-600/70 tracking-widest uppercase">{animal.scientificName}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Habitat</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-700 truncate">{animal.habitat}</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Info className="w-3.5 h-3.5 text-slate-400" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                                                </div>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${animal.conservationStatus === 'Extinct' ? 'text-red-500' :
                                                        animal.conservationStatus === 'Endangered' ? 'text-orange-500' :
                                                            'text-teal-600'
                                                    }`}>{animal.conservationStatus}</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-4">
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 italic">
                                                "{animal.funFacts}"
                                            </p>
                                            <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all border border-slate-100 flex items-center justify-center gap-2">
                                                Observation Details <Sparkles className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {!loading && filteredAnimals.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 text-center"
                    >
                        <div className="w-24 h-24 bg-teal-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-teal-600 border border-teal-100">
                            <PawPrint size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Species Not Identified</h3>
                        <p className="text-slate-500 mt-2 text-lg font-medium">Try adjusting your filters or search parameters</p>
                        <button
                            onClick={() => { setFilter('All'); setSearchTerm(''); }}
                            className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/20"
                        >
                            Reset Repository
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AnimalsPage;

