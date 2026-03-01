import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Ticket } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyTickets = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get('http://localhost:5000/api/tickets/my', config);
                setTickets(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchMyTickets();
    }, [user]);

    if (!user) return <div className="text-center py-20">Please login to view your profile.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Role</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.role}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Booking History</h2>
            {loading ? (
                <p>Loading bookings...</p>
            ) : tickets.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tickets.map(ticket => (
                        <div key={ticket._id} className="bg-white border rounded-xl shadow-sm p-6 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Ticket ID</p>
                                    <p className="font-mono text-xs text-gray-400">{ticket._id}</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'booked' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                                    }`}>
                                    {ticket.status.toUpperCase()}
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <Ticket className="h-10 w-10 text-primary mr-3" />
                                <div>
                                    <p className="font-bold text-lg">{ticket.type} Ticket</p>
                                    <p className="text-gray-600">Quantity: {ticket.count}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-500">Date of Visit</p>
                                    <p className="font-medium">{new Date(ticket.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Total Paid</p>
                                    <p className="text-xl font-bold text-gray-900">${ticket.totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
