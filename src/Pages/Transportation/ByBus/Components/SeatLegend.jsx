import React from 'react';
import { FaCheck, FaLock } from 'react-icons/fa';

const SeatLegend = () => {
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-white border border-gray-200 rounded mr-2"></div>
                <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 border border-gray-200 rounded mr-2"></div>
                <span className="text-sm">Premium (+30%)</span>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 bg-primary text-white rounded mr-2 flex items-center justify-center">
                    <FaCheck size={12} />
                </div>
                <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded mr-2 flex items-center justify-center">
                    <FaLock size={12} className="text-gray-500" />
                </div>
                <span className="text-sm">Booked</span>
            </div>
        </div>
    );
};

export default SeatLegend;
