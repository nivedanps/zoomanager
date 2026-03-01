import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookTicketsPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [ticketType, setTicketType] = useState('Adult');
    const [count, setCount] = useState(1);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Prices
    // Prices
    const prices = {
        'Adult': 200,
        'Child': 100,
        'Student': 150,
        'Senior': 150
    };

    const totalAmount = prices[ticketType] * count;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to book tickets');
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            // Simulate Payment
            await new Promise(resolve => setTimeout(resolve, 1500));

            const ticketData = {
                type: ticketType,
                date,
                price: prices[ticketType],
                count,
                totalAmount
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            await axios.post('http://localhost:5000/api/tickets', ticketData, config);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert('Booking Failed');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">Your tickets have been successfully booked. You can view them in your profile or check your email.</p>
                    <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 w-full mb-2">Return Home</button>
                    <button onClick={() => setSuccess(false)} className="text-primary hover:text-blue-700 w-full text-sm font-medium">Book Another</button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Book Tickets</h1>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Info Side */}
                <div className="bg-gray-900 text-white p-8 md:w-1/3 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Ticket Rates</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between border-b border-gray-700 pb-2">
                            <span>Adult</span>
                            <span className="font-bold">₹200</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-700 pb-2">
                            <span>Child (3-12)</span>
                            <span className="font-bold">₹100</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-700 pb-2">
                            <span>Student</span>
                            <span className="font-bold">₹150</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-700 pb-2">
                            <span>Senior (60+)</span>
                            <span className="font-bold">₹150</span>
                        </li>
                    </ul>
                </div>

                {/* Form Side */}
                <div className="p-8 md:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                                <select
                                    value={ticketType}
                                    onChange={(e) => setTicketType(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {Object.keys(prices).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <div className="flex items-center space-x-4">
                                <button type="button" onClick={() => setCount(Math.max(1, count - 1))} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 font-bold">-</button>
                                <span className="text-xl font-bold text-gray-900 w-8 text-center">{count}</span>
                                <button type="button" onClick={() => setCount(count + 1)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 font-bold">+</button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-700">Total Amount:</span>
                            <span className="text-3xl font-extrabold text-primary">₹{totalAmount}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-bold text-white text-lg transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-green-600'}`}
                        >
                            {loading ? 'Processing Payment...' : 'Proceed to Pay'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookTicketsPage;
