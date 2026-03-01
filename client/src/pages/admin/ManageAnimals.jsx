import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Plus, Edit, Trash2, X, Search, Filter, MoreVertical, PawPrint, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const ManageAnimals = () => {
    const { user } = useContext(AuthContext);
    const [animals, setAnimals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAnimals = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals');
            setAnimals(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        try {
            if (editingAnimal) {
                await axios.put(`http://localhost:5000/api/animals/${editingAnimal._id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/api/animals', data, config);
            }
            fetchAnimals();
            closeModal();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const deleteAnimal = async (id) => {
        if (window.confirm('Are you sure you want to delete this animal?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/animals/${id}`, config);
                fetchAnimals();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openModal = (animal = null) => {
        setEditingAnimal(animal);
        if (animal) {
            setValue('name', animal.name);
            setValue('scientificName', animal.scientificName);
            setValue('category', animal.category);
            setValue('habitat', animal.habitat);
            setValue('diet', animal.diet);
            setValue('lifespan', animal.lifespan);
            setValue('activeTime', animal.activeTime);
            setValue('weight', animal.weight);
            setValue('height', animal.height);
            setValue('conservationStatus', animal.conservationStatus);
            setValue('image', animal.image);
            setValue('funFacts', animal.funFacts);
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAnimal(null);
        reset();
    };

    const filteredAnimals = animals.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Species Repository</h2>
                    <p className="text-slate-500 font-medium">Manage and catalog the sanctuary's diverse wildlife</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal()}
                    className="btn-premium flex items-center justify-center gap-2 py-4 px-8 !rounded-2xl shadow-xl shadow-teal-500/20 text-white"
                >
                    <Plus size={20} /> Add New Species
                </motion.button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name, category, or status..."
                        className="glass-input !pl-14 !bg-white border-slate-200 focus:!border-teal-500/30 w-full shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="glass-card !bg-white px-6 py-2 flex items-center gap-2 text-slate-600 font-bold border-slate-200 hover:border-teal-500/30 transition-all">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Animals Grid/Table Container */}
            <div className="glass-card !bg-white overflow-hidden border-slate-200/50 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Species</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest text-center">Taxonomy</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAnimals.map(animal => (
                                <motion.tr
                                    layout
                                    key={animal._id}
                                    className="hover:bg-teal-50/30 transition-colors group"
                                >
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-teal-500/20 transition-all">
                                                <img src={animal.image} alt={animal.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-900">{animal.name}</div>
                                                <div className="text-xs italic text-slate-400">{animal.scientificName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-center">
                                        <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg">
                                            {animal.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-center">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${animal.conservationStatus === 'Extinct' ? 'bg-red-50 text-red-600' :
                                            animal.conservationStatus === 'Endangered' ? 'bg-orange-50 text-orange-600' :
                                                'bg-teal-50 text-teal-600'
                                            }`}>
                                            {animal.conservationStatus}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openModal(animal)}
                                                className="p-2 lg:p-3 rounded-xl hover:bg-teal-50 text-slate-400 hover:text-teal-600 transition-all border border-transparent hover:border-teal-500/20"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteAnimal(animal._id)}
                                                className="p-2 lg:p-3 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredAnimals.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <PawPrint size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No Species Found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your filters or adding a new record</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-teal-600 rounded-2xl text-white">
                                            <PawPrint size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                                {editingAnimal ? 'Modify Catalog' : 'Catalog New Species'}
                                            </h3>
                                            <p className="text-slate-500 text-sm font-medium">Update the sanctuary's genetic repository</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-3 rounded-2xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Common Name</label>
                                            <input {...register("name", { required: true })} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. Bengal Tiger" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Scientific Name</label>
                                            <input {...register("scientificName")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. Panthera tigris" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                            <select {...register("category", { required: true })} className="glass-input !bg-slate-50 border-slate-200">
                                                <option value="Mammals">Mammals</option>
                                                <option value="Birds">Birds</option>
                                                <option value="Fish">Fish</option>
                                                <option value="Reptiles">Reptiles</option>
                                                <option value="Amphibians">Amphibians</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Conservation Status</label>
                                            <input {...register("conservationStatus")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. Endangered" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Habitat</label>
                                            <input {...register("habitat")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. Savannah" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Diet</label>
                                            <input {...register("diet")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. Carnivore" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Lifespan</label>
                                            <input {...register("lifespan")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. 15-20 years" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Active Time</label>
                                            <select {...register("activeTime")} className="glass-input !bg-slate-50 border-slate-200">
                                                <option value="Diurnal">Diurnal</option>
                                                <option value="Nocturnal">Nocturnal</option>
                                                <option value="Crepuscular">Crepuscular</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Weight</label>
                                            <input {...register("weight")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. 190kg" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Height</label>
                                            <input {...register("height")} className="glass-input !bg-slate-50 border-slate-200" placeholder="e.g. 1.2m" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Media Archive (URL)</label>
                                            <input {...register("image", { required: true })} className="glass-input !bg-slate-50 border-slate-200" placeholder="https://images.unsplash.com/..." />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fun Facts</label>
                                            <textarea {...register("funFacts")} className="glass-input !bg-slate-50 border-slate-200 min-h-[100px] py-4" placeholder="Share something unique..." />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-premium text-white flex-1 py-4 !rounded-2xl text-lg flex items-center justify-center gap-3"
                                        >
                                            {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : (
                                                <>Repository Sync <Eye size={20} /></>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-8 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
                                        >
                                            Abort
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageAnimals;

