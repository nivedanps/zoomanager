import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Users, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const categories = [
        { name: 'Mammals', count: 124, icon: '🦁', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1000' },
        { name: 'Birds', count: 86, icon: '🦅', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=1000' },
        { name: 'Reptiles', count: 42, icon: '🦎', image: 'https://images.unsplash.com/photo-1512148173402-e4edc2049d2b?auto=format&fit=crop&q=80&w=1000' },
        { name: 'Aquatic', count: 58, icon: '🐬', image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=1000' },
    ];

    return (
        <div className="relative overflow-hidden bg-slate-50">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=2000"
                        alt="Hero Background"
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-6 text-teal-400">
                            <span className="w-12 h-[2px] bg-teal-500" />
                            <span className="font-bold tracking-widest uppercase text-sm">Experience Wildlife Like Never Before</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl text-white font-black mb-6 leading-tight font-display">
                            Discover the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Majesty of Nature</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                            Immerse yourself in a world class sanctuary dedicated to conservation, education, and the incredible diversity of life on Earth.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/tickets" className="btn-premium flex items-center gap-2 text-lg">
                                Book Your Experience <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/gallery" className="px-8 py-3 rounded-2xl font-bold border border-white/20 text-white hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center">
                                Virtual Tour
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-10 inset-x-0 container mx-auto px-6 hidden lg:block"
                >
                    <div className="glass-card p-10 grid grid-cols-4 gap-8">
                        {[
                            { label: 'Wildlife Species', val: '450+', icon: <Sparkles className="text-teal-500" /> },
                            { label: 'Annual Visitors', val: '1.2M', icon: <Users className="text-teal-500" /> },
                            { label: 'Conservation Area', val: '240h', icon: <ShieldCheck className="text-teal-500" /> },
                            { label: 'Team Experts', val: '120+', icon: <Heart className="text-teal-500" /> },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="mb-2">{stat.icon}</div>
                                <div className="text-3xl font-black text-slate-800">{stat.val}</div>
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Discovery Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl mb-6">Explore by Category</h2>
                        <div className="w-24 h-1 bg-teal-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Mammals', count: 100, icon: '🦁', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Birds', count: 100, icon: '🦅', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Reptiles', count: 100, icon: '🦎', image: 'https://images.unsplash.com/photo-1512148173402-e4edc2049d2b?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Aquatic', count: 100, icon: '🐬', image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=1000' },
                            { name: 'Amphibians', count: 100, icon: '🐸', image: 'https://images.unsplash.com/photo-1596707328646-7c9c0d57181c?auto=format&fit=crop&q=80&w=1000' }, // Added Amphibians
                        ].map((cat, i) => (
                            <Link to={`/animals?category=${cat.name}`} key={i} className="transform transition-all duration-500 hover:scale-105">
                                <motion.div
                                    whileHover={{ y: -15 }}
                                    className="group relative h-[450px] rounded-[40px] overflow-hidden cursor-pointer shadow-2xl border-4 border-white/20"
                                >
                                    <img src={cat.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100" alt={cat.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <motion.span
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            className="text-6xl mb-4 block w-fit"
                                        >
                                            {cat.icon}
                                        </motion.span>
                                        <h3 className="text-4xl text-white font-black mb-2 tracking-tight">{cat.name}</h3>
                                        <div className="h-1 w-12 bg-teal-500 mb-4 rounded-full group-hover:w-24 transition-all duration-500" />
                                        <p className="text-slate-200 font-medium mb-6 opacity-80 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {cat.count}+ species to discover
                                        </p>
                                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-teal-500 group-hover:border-teal-400 transition-all shadow-lg">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking CTA */}
            <section className="py-24 relative bg-teal-900/5">
                <div className="container mx-auto px-6">
                    <div className="glass-card p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px]" />
                        <div className="relative z-10 flex-1">
                            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">Ready for an <br /><span className="text-teal-600">Unforgettable Journey?</span></h2>
                            <p className="text-slate-600 text-xl mb-10 max-w-xl">
                                Join us for daily tours, feeding sessions, and exclusive wildlife photography workshops. Save 15% on online bookings.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/tickets" className="btn-premium">Plan Your Visit</Link>
                                <Link to="/contact" className="px-8 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition-all border border-slate-200">
                                    Talk to an Expert
                                </Link>
                            </div>
                        </div>
                        <div className="relative z-10 w-full md:w-1/3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/50 rounded-3xl border border-white text-center shadow-lg">
                                    <Calendar className="mx-auto mb-2 text-teal-600" />
                                    <div className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Mon - Sun</div>
                                    <div className="text-xs text-slate-500">9:00 - 18:00</div>
                                </div>
                                <div className="p-6 bg-white/50 rounded-3xl border border-white text-center shadow-lg">
                                    <Sparkles className="mx-auto mb-2 text-teal-600" />
                                    <div className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Live Events</div>
                                    <div className="text-xs text-slate-500">Every Weekend</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

