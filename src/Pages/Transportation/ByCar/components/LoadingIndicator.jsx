import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingIndicator;
