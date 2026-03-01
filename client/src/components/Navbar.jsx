import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Menu, X, LogOut, User as UserIcon, Ticket, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Animals", path: "/animals" },
        { name: "Gallery", path: "/gallery" },
        { name: "Events", path: "/events" },
        { name: "Vacancies", path: "/vacancies" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'
            }`}>
            <div className="container mx-auto px-6">
                <div className={`relative flex justify-between items-center px-8 py-4 rounded-[32px] transition-all duration-700 border border-white/20 shadow-2xl ${scrolled ? 'bg-white/70 backdrop-blur-2xl' : 'bg-white/10 backdrop-blur-md'
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group text-decoration-none">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full group-hover:bg-teal-500/40 transition-all" />
                            <div className="relative bg-teal-600 p-2.5 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <span className={`text-2xl font-black font-display tracking-tighter transition-colors ${scrolled ? 'text-slate-900' : 'text-white'
                            }`}>
                            ZOO<span className="text-teal-500">VERSE</span>
                        </span>
                    </Link>

                    {/* Desktop Tabs */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const active = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`nav-tab px-6 py-2.5 rounded-2xl font-bold transition-all text-decoration-none ${active
                                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                                            : scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Action Area */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link to="/tickets" className="btn-premium flex items-center gap-2 group text-decoration-none">
                            <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Tickets</span>
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4 pl-6 border-l border-slate-300/30">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => navigate(user.role === 'admin' ? '/admin' : '/profile')}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-teal-600/10 flex items-center justify-center text-teal-600 border border-teal-600/20">
                                        <UserIcon className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${scrolled ? 'text-slate-400' : 'text-slate-300'}`}>
                                            {user.role}
                                        </span>
                                        <span className={`text-sm font-bold truncate max-w-[100px] ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                                            {user.name}
                                        </span>
                                    </div>
                                </motion.div>
                                <button
                                    onClick={handleLogout}
                                    className={`p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all ${scrolled ? 'text-slate-400' : 'text-slate-300'}`}
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className={`px-6 py-2.5 rounded-2xl font-bold transition-all text-decoration-none ${scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link to="/register" className="btn-premium text-decoration-none">Join</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-3 rounded-2xl transition-all ${scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white'
                            }`}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full inset-x-0 mt-4 px-6"
                    >
                        <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-slate-100">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-8 py-4 rounded-2xl text-xl font-bold transition-all text-decoration-none ${location.pathname === link.path
                                                ? 'bg-teal-600 text-white'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <hr className="my-4 border-slate-100" />
                                <Link to="/tickets" onClick={() => setIsOpen(false)} className="btn-premium w-full text-center text-xl text-decoration-none">
                                    Book Tickets
                                </Link>
                                {!user ? (
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-4 text-slate-600 font-bold text-decoration-none">
                                        Login to Account
                                    </Link>
                                ) : (
                                    <button onClick={handleLogout} className="w-full text-center py-4 text-red-500 font-bold">
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

