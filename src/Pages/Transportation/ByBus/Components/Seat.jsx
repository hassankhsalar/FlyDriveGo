import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaWheelchair } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const Seat = ({ seatNumber, seatLabel, status, isPremium, isAccessible, onClick }) => {
    const getSeatClass = (status) => {
        switch (status) {
            case 'booked':
                return 'bg-gray-300 text-gray-500 cursor-not-allowed';
            case 'selected':
                return 'bg-primary text-white shadow-md';
            case 'premium':
                return 'bg-indigo-100 text-indigo-700 hover:bg-primary hover:text-white';
            default:
                return 'bg-white text-gray-700 hover:bg-primary hover:text-white';
        }
    };

    // Generate a tooltip ID
    const tooltipId = `seat-tooltip-${seatNumber}`;

    // Format the tooltip text based on seat status
    const getTooltipText = () => {
        if (status === 'booked') return 'Already booked';
        if (status === 'selected') return 'Your selection';
        if (status === 'premium') return 'Premium seat (+30%)';
        return 'Available seat';
    };

    return (
        <>
            <motion.button
                className={`w-12 h-12 rounded-md flex flex-col items-center justify-center border border-gray-200 ${getSeatClass(status)} relative`}
                onClick={() => onClick(seatNumber)}
                whileHover={status !== 'booked' ? { scale: 1.05, y: -2 } : {}}
                whileTap={status !== 'booked' ? { scale: 0.95 } : {}}
                disabled={status === 'booked'}
                data-tooltip-id={tooltipId}
                data-tooltip-content={getTooltipText()}
            >
                {/* Seat icon with different appearance based on status */}
                <div className="flex items-center justify-center mb-1">
                    {status === 'booked' ? <FaLock size={10} /> : null}
                    {isAccessible && <FaWheelchair size={10} className="text-blue-500" />}
                </div>

                {/* Seat label */}
                <span className="text-xs font-medium">{seatLabel}</span>

                {isPremium && status !== 'selected' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full"></span>
                )}
            </motion.button>

            {/* Tooltip for each seat */}
            <Tooltip id={tooltipId} place="top" effect="solid" />
        </>
    );
};

export default Seat;
