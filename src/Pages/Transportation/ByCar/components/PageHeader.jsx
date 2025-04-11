import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageHeader = () => {
    return (
        <div className="flex items-center mb-8">
            <Link to="/transportation" className="mr-4 text-CharcoleDark hover:text-primary transition-colors">
                <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-red-rose font-bold text-CharcoleDark">Car Rentals</h1>
        </div>
    );
};

export default PageHeader;
