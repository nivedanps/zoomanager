import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/events');
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        try {
            if (editingEvent) {
                await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/api/events', data, config);
            }
            fetchEvents();
            closeModal();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Operation failed');
        }
    };

    const deleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/events/${id}`, config);
                fetchEvents();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openModal = (event = null) => {
        setEditingEvent(event);
        if (event) {
            setValue('title', event.title);
            setValue('description', event.description);
            setValue('date', event.date.split('T')[0]);
            setValue('time', event.time);
            setValue('location', event.location);
            setValue('capacity', event.capacity);
            setValue('image', event.image);
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        reset();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Event
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map(event => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(event)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => deleteEvent(event._id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                                    <button onClick={closeModal}><X size={24} className="text-gray-400" /></button>
                                </div>
                                <form id="eventForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input {...register("title", { required: true })} placeholder="Title" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <textarea {...register("description")} placeholder="Description" className="w-full border rounded p-2"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="date" {...register("date", { required: true })} className="w-full border rounded p-2" />
                                        <input type="time" {...register("time")} className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <input {...register("location")} placeholder="Location" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <input type="number" {...register("capacity")} placeholder="Capacity" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <input {...register("image")} placeholder="Image URL" className="w-full border rounded p-2" />
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="submit" form="eventForm" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
