import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/30">
            {/* Background Animal Features */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
                <div className="absolute top-20 left-[10%] w-64 h-64 bg-[url('https://cdn-icons-png.flaticon.com/512/616/616412.png')] bg-contain bg-no-repeat animate-float-slow grayscale opacity-20"></div>
                <div className="absolute bottom-40 right-[15%] w-80 h-80 bg-[url('https://cdn-icons-png.flaticon.com/512/235/235371.png')] bg-contain bg-no-repeat animate-float-slow grayscale opacity-10" style={{ animationDelay: '-3s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
            </div>

            <Navbar />

            <main className="flex-grow pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>

            <footer className="glass-panel border-t-0 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-black text-primary">ZooVerse</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Connecting people with wildlife through immersive experiences and conservation efforts.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-900">Explore</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="/animals" className="hover:text-primary transition-colors">Our Animals</a></li>
                                <li><a href="/gallery" className="hover:text-primary transition-colors">Virtual Tour</a></li>
                                <li><a href="/tickets" className="hover:text-primary transition-colors">Tickets</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-900">Contact</h4>
                            <p className="text-sm text-gray-500">123 Wildlife Ave, Zoo City</p>
                            <p className="text-sm text-gray-500">info@zooverse.com</p>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400">&copy; 2026 ZooVerse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
