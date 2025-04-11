import React from 'react';
import { FaSearch } from 'react-icons/fa';

const NoResultsFound = () => {
    return (
        <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-CharcoleDark mb-2">No cars found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
        </div>
    );
};

export default NoResultsFound;
