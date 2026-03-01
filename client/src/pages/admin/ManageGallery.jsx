import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Plus, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageGallery = () => {
    const { user } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const fetchImages = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/gallery');
            setImages(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        try {
            await axios.post('http://localhost:5000/api/gallery', data, config);
            fetchImages();
            closeModal();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Operation failed');
        }
    };

    const deleteImage = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/gallery/${id}`, config);
                fetchImages();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openModal = () => {
        reset();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Image
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map(img => (
                    <div key={img._id} className="relative group bg-white rounded-lg shadow overflow-hidden">
                        <img src={img.image} alt={img.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-sm font-bold text-gray-900">{img.title}</h3>
                            <p className="text-xs text-gray-500">{img.category}</p>
                        </div>
                        <button
                            onClick={() => deleteImage(img._id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
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
                                    <h3 className="text-lg font-medium text-gray-900">Add New Image</h3>
                                    <button onClick={closeModal}><X size={24} className="text-gray-400" /></button>
                                </div>
                                <form id="galleryForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input {...register("title", { required: true })} placeholder="Title" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <select {...register("category", { required: true })} className="w-full border rounded p-2">
                                            <option value="Animals">Animals</option>
                                            <option value="Infrastructure">Infrastructure</option>
                                            <option value="Events">Events</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input {...register("image", { required: true })} placeholder="Image URL" className="w-full border rounded p-2" />
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="submit" form="galleryForm" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                    {loading ? 'Uploading...' : 'Upload'}
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

export default ManageGallery;
