import { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Briefcase, MapPin, DollarSign, FileText, Plus, X, ArrowLeft } from 'lucide-react';
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loader from '../../../components/ui/Loader';

const EditJobForm = () => {
    const { jobId } = useParams();
    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [requirements, setRequirements] = useState(['']);
    const [benefits, setBenefits] = useState(['']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const departments = useMemo(() => [
        'Technology',
        'Product',
        'Marketing',
        'Operations',
        'Customer Success'
    ], []);

    const jobTypes = useMemo(() => [
        'Full-time',
        'Part-time',
        'Contract',
        'Internship'
    ], []);

    // Fetch job data
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                setLoading(true);
                const response = await axiosPublic.get(`/jobs/${jobId}`);
                const job = response.data;

                if (job) {
                    // Set form values
                    setValue('title', job.title);
                    setValue('department', job.department);
                    setValue('location', job.location);
                    setValue('type', job.type);
                    setValue('salary', job.salary);
                    setValue('description', job.description);

                    // Set requirements and benefits
                    if (Array.isArray(job.requirements)) {
                        setRequirements(job.requirements);
                    }

                    if (Array.isArray(job.benefits)) {
                        setBenefits(job.benefits);
                    }
                } else {
                    toast.error('Job not found');
                    navigate('/careers/edit-job');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                toast.error('Failed to load job data');
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [jobId, axiosPublic, setValue, navigate]);

    const onSubmit = async (data) => {
        // Filter out empty entries
        const filteredRequirements = requirements.filter(r => r.trim() !== '');
        const filteredBenefits = benefits.filter(b => b.trim() !== '');

        if (filteredRequirements.length === 0 || filteredBenefits.length === 0) {
            toast.error('Please add at least one requirement and benefit');
            return;
        }

        const jobData = {
            ...data,
            requirements: filteredRequirements,
            benefits: filteredBenefits
        };

        try {
            setIsSubmitting(true);
            await axiosPublic.patch(`/jobs/${jobId}`, jobData);
            toast.success('Job updated successfully!');
            navigate('/careers/edit-job');
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error('Failed to update job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddRequirement = () => {
        setRequirements(prev => [...prev, '']);
    };

    const handleRequirementChange = (index, value) => {
        setRequirements(prev => {
            const newRequirements = [...prev];
            newRequirements[index] = value;
            return newRequirements;
        });
    };

    const handleRemoveRequirement = (index) => {
        setRequirements(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddBenefit = () => {
        setBenefits(prev => [...prev, '']);
    };

    const handleBenefitChange = (index, value) => {
        setBenefits(prev => {
            const newBenefits = [...prev];
            newBenefits[index] = value;
            return newBenefits;
        });
    };

    const handleRemoveBenefit = (index) => {
        setBenefits(prev => prev.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-SmokeWhite p-8 opacity-0 animate-fadeIn"
        >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-red-rose font-bold text-CharcoleDark">
                        Edit Job
                    </h1>
                    <button
                        onClick={() => navigate('/careers/edit-job')}
                        className="flex items-center gap-2 text-CharcoleDark/70 hover:text-CharcoleDark transition-colors duration-300 hover:scale-105 active:scale-95 transform font-red-rose"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Jobs
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Job Title */}
                    <FormField
                        label="Job Title"
                        icon={<Briefcase className="w-5 h-5 text-primary" />}
                        error={errors.title}
                    >
                        <TextField
                            fullWidth
                            {...register("title", { required: "Job title is required" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </FormField>

                    {/* Department & Location */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            label="Department"
                            icon={<Briefcase className="w-5 h-5 text-primary" />}
                            error={errors.department}
                        >
                            <FormControl fullWidth error={!!errors.department}>
                                <InputLabel>Department</InputLabel>
                                <Controller
                                    name="department"
                                    control={control}
                                    rules={{ required: "Department is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Department"
                                        >
                                            {departments.map(dept => (
                                                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.department?.message}</FormHelperText>
                            </FormControl>
                        </FormField>

                        <FormField
                            label="Location"
                            icon={<MapPin className="w-5 h-5 text-primary" />}
                            error={errors.location}
                        >
                            <TextField
                                fullWidth
                                {...register("location", { required: "Location is required" })}
                                error={!!errors.location}
                                helperText={errors.location?.message}
                            />
                        </FormField>
                    </div>

                    {/* Type & Salary */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            label="Job Type"
                            icon={<Briefcase className="w-5 h-5 text-primary" />}
                            error={errors.type}
                        >
                            <FormControl fullWidth error={!!errors.type}>
                                <InputLabel>Job Type</InputLabel>
                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{ required: "Job type is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Job Type"
                                        >
                                            {jobTypes.map(type => (
                                                <MenuItem key={type} value={type}>{type}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.type?.message}</FormHelperText>
                            </FormControl>
                        </FormField>

                        <FormField
                            label="Salary Range"
                            icon={<DollarSign className="w-5 h-5 text-primary" />}
                            error={errors.salary}
                        >
                            <TextField
                                fullWidth
                                {...register("salary", { required: "Salary range is required" })}
                                error={!!errors.salary}
                                helperText={errors.salary?.message}
                                placeholder="e.g. $100k - $130k per year"
                            />
                        </FormField>
                    </div>

                    {/* Description */}
                    <FormField
                        label="Job Description"
                        icon={<FileText className="w-5 h-5 text-primary" />}
                        error={errors.description}
                    >
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            {...register("description", { required: "Description is required" })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </FormField>

                    {/* Requirements */}
                    <DynamicFieldList
                        label="Requirements"
                        icon={<Briefcase className="w-5 h-5 text-primary" />}
                        items={requirements}
                        onAdd={handleAddRequirement}
                        onChange={handleRequirementChange}
                        onRemove={handleRemoveRequirement}
                    />

                    {/* Benefits */}
                    <DynamicFieldList
                        label="Benefits"
                        icon={<Briefcase className="w-5 h-5 text-primary" />}
                        items={benefits}
                        onAdd={handleAddBenefit}
                        onChange={handleBenefitChange}
                        onRemove={handleRemoveBenefit}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-102 active:scale-98 transform disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                        ) : (
                            'Update Job'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const FormField = ({ label, icon, children, error }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 font-poppins text-CharcoleDark/80">
            {icon}
            {label}
        </label>
        {children}
    </div>
);

const DynamicFieldList = ({ label, icon, items, onAdd, onChange, onRemove }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-poppins text-CharcoleDark/80">
                {icon}
                {label}
            </span>
            <button
                type="button"
                onClick={onAdd}
                className="flex items-center gap-1 text-primary font-poppins hover:bg-primary/10 transition-colors duration-300 px-3 py-1 rounded-lg"
            >
                <Plus className="w-4 h-4" />
                Add {label.slice(0, -1)}
            </button>
        </div>

        {items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center animate-fadeSlideUp">
                <TextField
                    fullWidth
                    value={item}
                    onChange={(e) => onChange(index, e.target.value)}
                />
                {items.length > 1 && (
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        ))}
    </div>
);

export default EditJobForm;