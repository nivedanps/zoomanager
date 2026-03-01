import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/events');
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Upcoming Events</h1>

            {events.length === 0 && (
                <p className="text-center text-gray-500">No upcoming events scheduled at the moment.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {events.map(event => (
                    <div key={event._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col md:flex-row">
                        <div className="md:w-2/5">
                            <img src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={event.title} className="w-full h-full object-cover h-48 md:h-full" />
                        </div>
                        <div className="p-6 md:w-3/5 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-primary" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
