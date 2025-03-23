import React from 'react';
import { motion } from 'framer-motion';

const JobDetailsComponent = ({ jobId }) => {
    const jobDetails = {
        1: {
            title: "Software Engineer",
            description: "Develop and maintain web applications.",
            responsibilities: "Write clean, scalable code. Collaborate with cross-functional teams.",
            qualifications: "Bachelor's degree in Computer Science or related field. 3+ years of experience.",
            benefits: "Health insurance, 401(k), remote work options."
        },
        2: {
            title: "Product Manager",
            description: "Oversee product development and strategy.",
            responsibilities: "Define product vision and strategy. Work with engineering teams.",
            qualifications: "Bachelor's degree in Business or related field. 5+ years of experience.",
            benefits: "Competitive salary, stock options, flexible hours."
        },
        // Add more job details as needed
    };

    const job = jobDetails[jobId];

    if (!job) {
        return <p>Job not found.</p>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="p-6 bg-white shadow-lg rounded-lg"
        >
            <h1 className="text-4xl font-bold text-primary mb-4">{job.title}</h1>
            <p className="text-lg text-text mb-4">{job.description}</p>
            <h2 className="text-2xl font-semibold text-primary mb-2">Responsibilities</h2>
            <p className="text-text mb-4">{job.responsibilities}</p>
            <h2 className="text-2xl font-semibold text-primary mb-2">Qualifications</h2>
            <p className="text-text mb-4">{job.qualifications}</p>
            <h2 className="text-2xl font-semibold text-primary mb-2">Benefits</h2>
            <p className="text-text mb-4">{job.benefits}</p>
        </motion.div>
    );
};

export default JobDetailsComponent;