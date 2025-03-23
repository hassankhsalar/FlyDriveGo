import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Search, PlusCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/ui/Loader';
import Swal from 'sweetalert2';

const EditJobsOptions = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch all jobs
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axiosPublic.get('/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [axiosPublic]);

    const handleAddNewJob = () => {
        navigate('/careers/add-job');
    };

    const handleEdit = (jobId) => {
        navigate(`/careers/edit-job/${jobId}`);
    };

    const handleDelete = (jobId, jobTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete the job: ${jobTitle}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/jobs/${jobId}`);
                    toast.success('Job deleted successfully');
                    fetchJobs();
                } catch (error) {
                    console.error('Error deleting job:', error);
                    toast.error('Failed to delete job');
                }
            }
        });
    };

    // Filter jobs based on search term
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen p-4 sm:p-8 bg-SmokeWhite"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-red-rose font-bold text-CharcoleDark mb-4 sm:mb-0">
                        Manage Job Listings
                    </h1>
                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/careers/applications')}
                            className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center gap-2 font-red-rose"
                        >
                            <Users className="w-5 h-5" />
                            View Applications
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddNewJob}
                            className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center gap-2 font-red-rose"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add New Job
                        </motion.button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-CharcoleDark/50" />
                    <input
                        type="text"
                        placeholder="Search jobs by title or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 font-poppins"
                    />
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-primary/5">
                            <tr>
                                <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Title</th>
                                <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Department</th>
                                <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Location</th>
                                <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Type</th>
                                <th className="px-6 py-4 text-center font-red-rose text-CharcoleDark">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <tr key={job.id} className="border-b border-SmokeWhite hover:bg-SmokeWhite/50">
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">{job.title}</td>
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">{job.department}</td>
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">{job.location}</td>
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">{job.type}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2 sm:gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEdit(job.id)}
                                                    className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(job.id, job.title)}
                                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center font-poppins text-CharcoleDark/60">
                                        No jobs found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default EditJobsOptions;