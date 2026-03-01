import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Plus, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageVacancies = () => {
    const { user } = useContext(AuthContext);
    const [vacancies, setVacancies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const fetchVacancies = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/vacancies');
            setVacancies(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        try {
            await axios.post('http://localhost:5000/api/vacancies', data, config);
            fetchVacancies();
            closeModal();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Operation failed');
        }
    };

    const deleteVacancy = async (id) => {
        if (window.confirm('Are you sure you want to delete this vacancy?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/vacancies/${id}`, config);
                fetchVacancies();
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
                <h2 className="text-2xl font-bold text-gray-900">Manage Vacancies</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Post Vacancy
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {vacancies.map(vacancy => (
                            <tr key={vacancy._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vacancy.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vacancy.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vacancy.salary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vacancy.applicants?.length || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => deleteVacancy(vacancy._id)} className="text-red-600 hover:text-red-900">
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
                                    <h3 className="text-lg font-medium text-gray-900">Post New Vacancy</h3>
                                    <button onClick={closeModal}><X size={24} className="text-gray-400" /></button>
                                </div>
                                <form id="vacancyForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input {...register("title", { required: true })} placeholder="Job Title" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <select {...register("type", { required: true })} className="w-full border rounded p-2">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input {...register("eligibility", { required: true })} placeholder="Eligibility Criteria" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <input {...register("salary")} placeholder="Salary Range" className="w-full border rounded p-2" />
                                    </div>
                                    <div>
                                        <textarea {...register("description", { required: true })} placeholder="Job Description" className="w-full border rounded p-2" rows="4"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="submit" form="vacancyForm" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                    {loading ? 'Posting...' : 'Post Job'}
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

export default ManageVacancies;
