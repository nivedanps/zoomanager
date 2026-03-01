import { useState, useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {
    LayoutDashboard, PawPrint, Ticket, Calendar, Briefcase,
    Users, Image, MessageSquare, LogOut, Menu, X
} from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/animals', label: 'Animals', icon: <PawPrint size={20} /> },
        { path: '/admin/tickets', label: 'Tickets', icon: <Ticket size={20} /> },
        { path: '/admin/events', label: 'Events', icon: <Calendar size={20} /> },
        { path: '/admin/vacancies', label: 'Vacancies', icon: <Briefcase size={20} /> },
        { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
        { path: '/admin/gallery', label: 'Gallery', icon: <Image size={20} /> },
        { path: '/admin/feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
                <div className="flex items-center justify-center h-16 border-b border-gray-800">
                    <span className="text-xl font-bold">Zoo Admin</span>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center w-full text-gray-300 hover:text-white group px-2 py-2 text-sm font-medium"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 text-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X size={24} className="text-white" />
                            </button>
                        </div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4 mb-5">
                                <span className="text-xl font-bold">Zoo Admin</span>
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${location.pathname === item.path
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        <span className="mr-4">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="p-4 border-t border-gray-700">
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="flex items-center w-full text-gray-300 hover:text-white group px-2 py-2 text-base font-medium"
                            >
                                <LogOut size={20} className="mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow">
                    <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Admin User</span>
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
