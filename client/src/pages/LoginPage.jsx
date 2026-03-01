import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const LoginPage = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1564349683136-77e08bef1ed1?auto=format&fit=crop&q=80&w=2000"
                    alt="Panda Background"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-[1100px] flex flex-col md:flex-row glass-card overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
            >
                {/* Visual Side */}
                <div className="hidden md:flex flex-1 relative flex-col justify-between p-12 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500 rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10">
                        <div className="bg-teal-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-4xl font-black font-display leading-tight mb-6">
                            Protecting Our <br />
                            <span className="text-teal-400 italic">Wildlife</span> Today
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
                            Access the global sanctuary dashboard and manage conservation efforts across all sectors.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-6 mt-12">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                            <div className="text-2xl font-black mb-1">500+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rare Species</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                            <div className="text-2xl font-black mb-1">24/7</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Monitoring</div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="flex-1 bg-white p-12 md:p-16">
                    <div className="mb-12">
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Log in to your sanctuary account</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-100 mb-8 font-semibold flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                                Sanctuary ID / Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="admin@zooverse.com"
                                    {...register('email', { required: 'Email is required' })}
                                    className="glass-input !bg-slate-50 !pl-14 border-slate-200 focus:!border-teal-500/50"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1">{errors.email.message}</p>}
                        </div>

                        <div className="group">
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                                Neural Key / Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('password', { required: 'Password is required' })}
                                    className="glass-input !bg-slate-50 !pl-14 border-slate-200 focus:!border-teal-500/50"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold pt-2">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-900 transition-colors">
                                <input type="checkbox" className="rounded-md border-slate-300 text-teal-600 focus:ring-teal-500" />
                                Remember Terminal
                            </label>
                            <Link className="text-teal-600 hover:text-teal-700 transition-colors">Lost Access?</Link>
                        </div>

                        <button
                            type="submit"
                            className="btn-premium w-full !rounded-2xl !py-4 flex items-center justify-center gap-3 text-lg mt-8 text-white"
                        >
                            Authorize Access <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <p className="text-center mt-12 text-slate-400 font-bold text-sm">
                        New Guardian? <Link to="/register" className="text-teal-600 hover:underline">Apply for Access</Link>
                    </p>
                </div>
            </motion.div>

            {/* Ambient Background Elements */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        </div>
    );
};

export default LoginPage;

