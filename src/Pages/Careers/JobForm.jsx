import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';

const JobForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/jobs/${jobId}`)
            .then((res) => {
                if (res.data) {
                    setJob(res.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching job data:", error);
                setLoading(false);
            });
    }, [jobId, axiosPublic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({ ...formData, resume: file.name }); // Store filename for now
            setErrors({ ...errors, resume: '' });
        } else {
            setErrors({ ...errors, resume: 'Please upload a PDF file' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.resume) newErrors.resume = 'Resume is required';
        if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const applicationData = {
            ...formData,
            jobId: parseInt(jobId),
            jobTitle: job?.title,
            applicationDate: new Date(),
            status: 'Pending Review'
        };

        try {
            await axiosPublic.post('/job-applications', applicationData);
            toast.success('Application submitted successfully!');
            navigate('/careers/confirmation');
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-SmokeWhite to-background opacity-0 animate-fadeIn"
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-8 flex items-center gap-2 text-primary font-poppins font-semibold hover:-translate-x-2 transition-transform duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Job Posting
                        </button>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-background p-8 rounded-2xl shadow-xl border border-SmokeWhite animate-fadeSlideUp"
                        >
                            <h1 className="text-3xl font-red-rose font-bold text-CharcoleDark mb-8 text-center">
                                Apply for: {job?.title || `Position #${jobId}`}
                            </h1>

                            <div className="space-y-6">
                                {/* Personal Info Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="animate-fadeSlideUp [animation-delay:100ms]">
                                        <label className="block font-poppins text-CharcoleDark/80 mb-2 font-bold">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                onChange={handleChange}
                                                placeholder='Full Name'
                                                className="font-poppins w-full pl-12 pr-4 py-3 bg-SmokeWhite rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:scale-102 focus:scale-103 transform"
                                            />
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div className="animate-fadeSlideUp [animation-delay:200ms]">
                                        <label className="block font-poppins text-CharcoleDark/80 mb-2 font-bold">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                placeholder='Email Address'
                                                className="font-poppins w-full pl-12 pr-4 py-3 bg-SmokeWhite rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:scale-102 focus:scale-103 transform"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div className="animate-fadeSlideUp [animation-delay:300ms]">
                                        <label className="block font-poppins text-CharcoleDark/80 mb-2 font-bold">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                onChange={handleChange}
                                                placeholder='Phone Number'
                                                className="font-poppins w-full pl-12 pr-4 py-3 bg-SmokeWhite rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:scale-102 focus:scale-103 transform"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div className="animate-fadeSlideUp [animation-delay:400ms]">
                                        <label className="block font-poppins text-CharcoleDark/80 mb-2 font-bold">
                                            Upload Resume (PDF)
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                            <input
                                                type="file"
                                                name="resume"
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                                className="font-poppins w-full pl-12 pr-4 py-3 bg-SmokeWhite rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-poppins file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all"
                                            />
                                        </div>
                                        {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                <div className="animate-fadeSlideUp [animation-delay:500ms]">
                                    <label className="block font-poppins text-CharcoleDark/80 mb-2 font-bold">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        onChange={handleChange}
                                        rows="5"
                                        className="font-poppins w-full px-4 py-3 bg-SmokeWhite rounded-lg border border-SmokeWhite focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:scale-102 focus:scale-103 transform"
                                    />
                                    {errors.coverLetter && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.coverLetter}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-white font-poppins font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all hover:scale-102 active:scale-98 transform flex items-center justify-center gap-3 animate-fadeIn [animation-delay:600ms]"
                                >
                                    {isSubmitting ? (
                                        <div
                                            className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"
                                        />
                                    ) : (
                                        <>
                                            <CheckCircle className="w-6 h-6" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobForm;