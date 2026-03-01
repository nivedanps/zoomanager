import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, CreditCard, ChevronRight } from 'lucide-react';

const VacanciesPage = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/vacancies');
                setVacancies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vacancies:', error);
                setLoading(false);
            }
        };
        fetchVacancies();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Join Our Team</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Help us protect wildlife and inspire the next generation of conservationists. Check out our open positions below.</p>

            {loading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {vacancies.length === 0 && (
                        <p className="text-center text-gray-500">Current there are no open vacancies.</p>
                    )}

                    {vacancies.map(job => (
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> {job.type}</span>
                                        <span className="flex items-center"><CreditCard className="h-4 w-4 mr-1" /> {job.salary}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mr-4">Active</span>
                                    {/* In a real app, Apply would open a modal with a form */}
                                    <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-gray-600 mb-2"><span className="font-bold">Eligibility:</span> {job.eligibility}</p>
                                <p className="text-gray-500 text-sm">{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VacanciesPage;
