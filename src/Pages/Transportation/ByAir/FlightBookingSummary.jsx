import React from 'react';
import { FaInfoCircle, FaPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FlightBookingSummary = ({
    flightDetails,
    selectedSeats,
    getSeatType,
    calculateTotal,
    timer,
    formatTime,
    handleContinue
}) => {
    // Format price to 2 decimal places
    const formatPrice = (price) => {
        return price.toFixed(2);
    };

    // Get price for a specific seat class
    const getSeatPrice = (type) => {
        const basePrice = flightDetails?.price || 0;

        switch (type) {
            case 'first':
                return basePrice * 2.5;
            case 'business':
                return basePrice * 1.5;
            case 'premium-economy':
                return basePrice * 1.2;
            default:
                return basePrice;
        }
    };

    // Count seats by class
    const countSeatsByClass = () => {
        return selectedSeats.reduce((counts, seatNumber) => {
            const type = getSeatType(seatNumber);
            counts[type] = (counts[type] || 0) + 1;
            return counts;
        }, {});
    };

    const seatCountByClass = countSeatsByClass();

    // Get pretty name for seat class
    const getSeatTypeName = (type) => {
        switch (type) {
            case 'first':
                return 'First Class';
            case 'business':
                return 'Business Class';
            case 'premium-economy':
                return 'Premium Economy';
            default:
                return 'Economy';
        }
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="bg-gradient-to-r from-blue-500 to-primary p-6 text-white">
                <h2 className="text-xl font-bold flex items-center">
                    <FaPlane className="mr-2" />
                    Booking Summary
                </h2>
                <p className="opacity-90 mt-1">{flightDetails?.airline}</p>
            </div>

            <div className="p-6">
                {/* Flight Details */}
                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                        <p className="text-gray-500 text-sm">Flight</p>
                        <p className="font-medium">{flightDetails?.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Route</p>
                        <p className="font-medium">{flightDetails?.route}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Date & Time</p>
                        <p className="font-medium">{flightDetails?.date} {flightDetails?.departureTime}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Selected Seats</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block px-2 py-1 rounded-md text-sm font-medium
                                            ${getSeatType(seat) === 'first' ? 'bg-blue-100 text-blue-800' :
                                                getSeatType(seat) === 'business' ? 'bg-indigo-100 text-indigo-800' :
                                                    getSeatType(seat) === 'premium-economy' ? 'bg-teal-100 text-teal-800' :
                                                        'bg-gray-100 text-gray-800'}
                                        `}
                                    >
                                        {seat}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">No seats selected</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pricing Details */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Price Details</h3>

                    {/* Price breakdown by seat class */}
                    {Object.entries(seatCountByClass).map(([type, count], index) => (
                        <div key={index} className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">
                                {getSeatTypeName(type)} × {count}
                            </span>
                            <span>
                                ${formatPrice(getSeatPrice(type) * count)}
                            </span>
                        </div>
                    ))}

                    {/* Fees & taxes */}
                    {selectedSeats.length > 0 && (
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Taxes & Fees</span>
                            <span>${formatPrice(selectedSeats.length * 25)}</span>
                        </div>
                    )}

                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                        <span className="font-semibold text-gray-800">Total</span>
                        <span className="font-bold text-xl text-primary">
                            ${formatPrice(calculateTotal() + (selectedSeats.length * 25))}
                        </span>
                    </div>
                </div>

                {/* Note about seat holding */}
                {selectedSeats.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
                        <FaInfoCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                            Your seats will be reserved for <span className="font-medium">{formatTime(timer)}</span>.
                            Please complete your booking before this timer expires.
                        </p>
                    </div>
                )}

                {/* Continue button */}
                <motion.button
                    className={`w-full py-3 rounded-lg font-medium transition-all 
                        ${selectedSeats.length > 0
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={handleContinue}
                    disabled={selectedSeats.length === 0}
                    whileHover={selectedSeats.length > 0 ? { scale: 1.02 } : {}}
                    whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
                >
                    Continue to Passenger Details
                </motion.button>
            </div>
        </motion.div>
    );
};

export default FlightBookingSummary;