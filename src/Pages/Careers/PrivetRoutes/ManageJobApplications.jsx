import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, User, Phone, Calendar, FileText, Filter, ArrowLeft, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/ui/Loader';

const ManageJobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [jobFilter, setJobFilter] = useState('All');
    const [jobs, setJobs] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    // Fetch all applications and jobs
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Get all applications
                const applicationsResponse = await axiosPublic.get('/job-applications');
                setApplications(applicationsResponse.data);
                
                // Get all jobs for filtering
                const jobsResponse = await axiosPublic.get('/jobs');
                setJobs(jobsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [axiosPublic]);
    
    // Filter applications based on search term, status, and job
    const filteredApplications = applications.filter(app => {
        // Search term filter (name, email, phone)
        const searchMatch = 
            app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.phone?.toLowerCase().includes(searchTerm.toLowerCase());
            
        // Status filter
        const statusMatch = statusFilter === 'All' || app.status === statusFilter;
        
        // Job filter
        const jobMatch = jobFilter === 'All' || app.jobId === parseInt(jobFilter);
        
        return searchMatch && statusMatch && jobMatch;
    });
    
    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await axiosPublic.patch(`/job-applications/${applicationId}`, { status: newStatus });
            
            // Update local state
            setApplications(prev => 
                prev.map(app => 
                    app._id === applicationId ? {...app, status: newStatus} : app
                )
            );
            
            toast.success(`Application status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating application status:', error);
            toast.error('Failed to update application status');
        }
    };
    
    // Get unique list of statuses from applications
    const statusOptions = ['All', 'Pending Review', 'In Review', 'Interview', 'Offer', 'Rejected'];
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending Review': return 'bg-blue-100 text-blue-800';
            case 'In Review': return 'bg-purple-100 text-purple-800';
            case 'Interview': return 'bg-amber-100 text-amber-800';
            case 'Offer': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
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
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ x: -3 }}
                            onClick={() => navigate('/careers/edit-job')}
                            className="text-CharcoleDark/70 hover:text-CharcoleDark"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                        <h1 className="text-2xl sm:text-3xl font-red-rose font-bold text-CharcoleDark">
                            Job Applications
                        </h1>
                    </div>
                </div>
                
                {/* Filters and Search */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-CharcoleDark/50" />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 font-poppins"
                        />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-CharcoleDark/50" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 font-poppins bg-white"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Job Filter */}
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-CharcoleDark/50" />
                        <select
                            value={jobFilter}
                            onChange={(e) => setJobFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 font-poppins bg-white"
                        >
                            <option value="All">All Jobs</option>
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    {filteredApplications.length > 0 ? (
                        <table className="w-full min-w-max">
                            <thead className="bg-primary/5">
                                <tr>
                                    <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Applicant</th>
                                    <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Job Position</th>
                                    <th className="px-6 py-4 text-left font-red-rose text-CharcoleDark">Date Applied</th>
                                    <th className="px-6 py-4 text-center font-red-rose text-CharcoleDark">Status</th>
                                    <th className="px-6 py-4 text-center font-red-rose text-CharcoleDark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map((application) => (
                                    <tr key={application._id} className="border-b border-SmokeWhite hover:bg-SmokeWhite/50 font-poppins">
                                        {/* Applicant Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-poppins font-medium text-CharcoleDark">{application.fullName}</span>
                                                <div className="flex items-center gap-1 text-sm text-CharcoleDark/70">
                                                    <Mail className="w-3 h-3" />
                                                    <span>{application.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-CharcoleDark/70">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{application.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Job Position */}
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">{application.jobTitle}</td>
                                        
                                        {/* Date Applied */}
                                        <td className="px-6 py-4 font-poppins text-CharcoleDark">
                                            {formatDate(application.applicationDate)}
                                        </td>
                                        
                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                        </td>
                                        
                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <select
                                                    value={application.status}
                                                    onChange={(e) => handleStatusChange(application._id, e.target.value)}
                                                    className="p-2 border border-gray-300 rounded-lg text-sm font-poppins"
                                                >
                                                    {statusOptions.slice(1).map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-CharcoleDark/70 font-poppins">No applications found matching your filters.</p>
                        </div>
                    )}
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {statusOptions.slice(1).map(status => {
                        const count = applications.filter(app => app.status === status).length;
                        return (
                            <div key={status} className="bg-white rounded-xl shadow-md p-4 border-l-4 border-primary font-poppins">
                                <h3 className="text-sm font-poppins text-CharcoleDark/70">{status}</h3>
                                <p className="text-2xl font-red-rose font-bold text-CharcoleDark">{count}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default ManageJobApplications;