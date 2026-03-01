import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Mail } from 'lucide-react';

const ManageFeedback = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/feedback', config);
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeedback();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Feedback</h2>

            {messages.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                    No feedback messages yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map(msg => (
                        <div key={msg._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                                        <Mail size={20} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-gray-900">{msg.name}</h3>
                                        <span className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{msg.email}</p>
                                    <p className="text-gray-800 bg-gray-50 p-3 rounded">{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageFeedback;
