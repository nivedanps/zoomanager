import { Users, Ticket, PawPrint, Calendar, TrendingUp, Activity, ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardHome = () => {
    const stats = [
        { label: 'Total Visitors', value: '12,345', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-600/10' },
        { label: 'Tickets Sold', value: '5,678', change: '+8%', icon: Ticket, color: 'text-teal-600', bg: 'bg-teal-600/10' },
        { label: 'Animals', value: '567', change: '+2', icon: PawPrint, color: 'text-orange-600', bg: 'bg-orange-600/10' },
        { label: 'Upcoming Events', value: '12', change: 'Live', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-600/10' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Command Center</h1>
                    <p className="text-slate-500 font-medium">Monitoring sanctuary operations in real-time</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Clock className="w-4 h-4 text-teal-600" />
                        Last Sync: Just Now
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="glass-card p-6 relative overflow-hidden group border-slate-200/50 hover:border-teal-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon size={56} />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                                {stat.change}
                            </span>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm font-bold mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Table */}
                <div className="lg:col-span-2 glass-card overflow-hidden border-slate-200/50">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-slate-600" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900">Recent Transactions</h3>
                        </div>
                        <button className="text-teal-600 text-sm font-bold hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Subscriber</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Access Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { name: 'Sarah Wilson', type: 'Family Pass', price: '$85.00', status: 'Verified' },
                                    { name: 'James Chen', type: 'Adult Entry', price: '$25.00', status: 'Pending' },
                                    { name: 'Elena Rodriguez', type: 'Guided Tour', price: '$120.00', status: 'Verified' },
                                    { name: 'Marcus Thorne', type: 'Child Entry', price: '$15.00', status: 'Verified' },
                                    { name: 'Aria Vance', type: 'Annual Member', price: '$250.00', status: 'Verified' }
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900">{item.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${item.status === 'Verified' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Log */}
                <div className="glass-card border-slate-200/50 flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Activity className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900">System Logs</h3>
                    </div>

                    <div className="p-6 flex-1 space-y-6">
                        {[
                            { action: 'Sanctuary Sector Alpha updated', time: '2m ago', color: 'bg-teal-500' },
                            { action: 'New staff member authorized', time: '45m ago', color: 'bg-blue-500' },
                            { action: 'Elephant diet log exported', time: '1h ago', color: 'bg-slate-500' },
                            { action: 'Emergency alert: Humidity low', time: '3h ago', color: 'bg-orange-500' },
                            { action: 'Gallery expansion published', time: '5h ago', color: 'bg-purple-500' }
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative flex flex-col items-center">
                                    <div className={`w-2 h-2 rounded-full ${log.color} ring-4 ring-white relative z-10`} />
                                    {i !== 4 && <div className="w-px h-full bg-slate-100 absolute top-2" />}
                                </div>
                                <div className="pb-4">
                                    <p className="text-sm font-bold text-slate-700 group-hover:text-teal-600 transition-colors cursor-pointer">{log.action}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="m-6 p-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                        Inspect All Logs <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

