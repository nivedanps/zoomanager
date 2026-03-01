import { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/gallery');
                setGallery(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching gallery:', error);
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Zoo Gallery</h1>

            {loading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {gallery.map((item) => (
                        <div key={item._id} className="break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {gallery.length === 0 && !loading && (
                <p className="text-center text-gray-500">No images available in the gallery yet.</p>
            )}
        </div>
    );
};

export default GalleryPage;
