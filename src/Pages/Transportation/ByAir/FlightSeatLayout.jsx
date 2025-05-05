import React from 'react';
import { FaWheelchair, FaPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FlightSeatLayout = ({ flightDetails, selectedSeats, handleSeatClick }) => {
    // Config for different airplane layouts
    const getAirplaneConfig = () => {
        const domestic = {
            firstClass: { rows: 2, seatsPerRow: 4 }, // 2 rows, 2 seats on each side
            business: { rows: 3, seatsPerRow: 6 }, // 3 rows, 3 seats on each side
            premiumEconomy: { rows: 3, seatsPerRow: 6 }, // 3 rows, 3 seats on each side
            economy: { rows: 20, seatsPerRow: 6 }, // 20 rows, 3 seats on each side
        };

        const international = {
            firstClass: { rows: 3, seatsPerRow: 4 }, // 3 rows, 2 seats on each side
            business: { rows: 5, seatsPerRow: 6 }, // 5 rows, 3 seats on each side
            premiumEconomy: { rows: 5, seatsPerRow: 8 }, // 5 rows, 4 seats on each side
            economy: { rows: 30, seatsPerRow: 10 }, // 30 rows, 5 seats on each side
        };

        return flightDetails?.type === 'international' ? international : domestic;
    };

    const airplaneConfig = getAirplaneConfig();

    const getSeatStatus = (seatNumber) => {
        if (flightDetails?.bookedSeats?.includes(seatNumber)) {
            return 'booked';
        }
        if (selectedSeats.includes(seatNumber)) {
            return 'selected';
        }
        const seatType = getSeatTypeClass(seatNumber);
        return seatType; // 'first', 'business', 'premium-economy', or 'economy'
    };

    const getSeatTypeClass = (seatNumber) => {
        if (flightDetails?.firstClassSeats?.includes(seatNumber)) {
            return 'first';
        }
        if (flightDetails?.businessClassSeats?.includes(seatNumber)) {
            return 'business';
        }
        if (flightDetails?.premiumEconomySeats?.includes(seatNumber)) {
            return 'premium-economy';
        }
        return 'economy';
    };

    const getSeatLabel = (seatNumber) => {
        // Basic seat labeling, can be customized based on airline preferences
        const seatPos = (seatNumber - 1) % airplaneConfig.economy.seatsPerRow;
        const rowNum = Math.ceil(seatNumber / airplaneConfig.economy.seatsPerRow);

        // Convert position to letter (A, B, C, D, E, F, etc.)
        const colLetter = String.fromCharCode(65 + seatPos);

        return `${rowNum}${colLetter}`;
    };

    return (
        <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="mb-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-medium text-CharcoleDark mb-4">Airplane Seating Layout</h3>

                {/* Seat type legend */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-600 rounded-md mr-2"></div>
                        <span className="text-sm">First Class</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-indigo-500 rounded-md mr-2"></div>
                        <span className="text-sm">Business</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-teal-500 rounded-md mr-2"></div>
                        <span className="text-sm">Premium Economy</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-md mr-2"></div>
                        <span className="text-sm">Economy</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-600 rounded-md mr-2"></div>
                        <span className="text-sm">Booked</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary rounded-md mr-2"></div>
                        <span className="text-sm">Selected</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-md mr-2">
                            <FaWheelchair className="text-blue-500 w-3 h-3" />
                        </div>
                        <span className="text-sm">Accessible</span>
                    </div>
                </div>

                {/* Airplane shape container */}
                <div className="relative bg-white border border-gray-200 rounded-3xl p-6 max-w-4xl mx-auto overflow-x-auto">
                    {/* Airplane cockpit */}
                    <div className="flex justify-center mb-10">
                        <div className="w-24 h-24 bg-gray-100 rounded-t-full border border-gray-300 flex items-center justify-center">
                            <FaPlane className="text-blue-500 text-2xl" />
                        </div>
                    </div>

                    {/* First Class */}
                    {airplaneConfig.firstClass.rows > 0 && (
                        <div className="mb-8">
                            <div className="text-center mb-2">
                                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    First Class
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                {Array.from({ length: airplaneConfig.firstClass.rows }).map((_, rowIndex) => (
                                    <div key={`first-${rowIndex}`} className="flex gap-4 w-full justify-center">
                                        {Array.from({ length: airplaneConfig.firstClass.seatsPerRow }).map((_, seatIndex) => {
                                            // Add aisle in the middle
                                            if (seatIndex === airplaneConfig.firstClass.seatsPerRow / 2) {
                                                return <div key={`first-aisle-${rowIndex}-${seatIndex}`} className="w-8"></div>;
                                            }

                                            const seatNumber = rowIndex * airplaneConfig.firstClass.seatsPerRow + seatIndex + 1;
                                            const status = getSeatStatus(seatNumber);

                                            return (
                                                <button
                                                    key={`first-seat-${seatNumber}`}
                                                    className={`w-12 h-12 rounded-md flex items-center justify-center border transition-all
                                                        ${status === 'booked' ? 'bg-gray-600 text-white cursor-not-allowed' :
                                                            status === 'selected' ? 'bg-primary text-white' :
                                                                status === 'first' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                                                                    'bg-gray-200 hover:bg-gray-300'}
                                                    `}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                    disabled={status === 'booked'}
                                                >
                                                    {getSeatLabel(seatNumber)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Business Class */}
                    {airplaneConfig.business.rows > 0 && (
                        <div className="mb-8">
                            <div className="text-center mb-2">
                                <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Business Class
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                {Array.from({ length: airplaneConfig.business.rows }).map((_, rowIndex) => (
                                    <div key={`business-${rowIndex}`} className="flex gap-2 w-full justify-center">
                                        {Array.from({ length: airplaneConfig.business.seatsPerRow }).map((_, seatIndex) => {
                                            // Add aisle in the middle
                                            if (seatIndex === airplaneConfig.business.seatsPerRow / 2) {
                                                return <div key={`business-aisle-${rowIndex}-${seatIndex}`} className="w-8"></div>;
                                            }

                                            const seatNumber =
                                                (airplaneConfig.firstClass.rows * airplaneConfig.firstClass.seatsPerRow) +
                                                (rowIndex * airplaneConfig.business.seatsPerRow) +
                                                seatIndex + 1;

                                            const status = getSeatStatus(seatNumber);

                                            return (
                                                <button
                                                    key={`business-seat-${seatNumber}`}
                                                    className={`w-10 h-10 rounded-md flex items-center justify-center border transition-all
                                                        ${status === 'booked' ? 'bg-gray-600 text-white cursor-not-allowed' :
                                                            status === 'selected' ? 'bg-primary text-white' :
                                                                status === 'business' ? 'bg-indigo-500 hover:bg-indigo-600 text-white' :
                                                                    'bg-gray-200 hover:bg-gray-300'}
                                                    `}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                    disabled={status === 'booked'}
                                                >
                                                    {getSeatLabel(seatNumber)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Premium Economy */}
                    {airplaneConfig.premiumEconomy.rows > 0 && (
                        <div className="mb-8">
                            <div className="text-center mb-2">
                                <span className="inline-block bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Premium Economy
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                {Array.from({ length: airplaneConfig.premiumEconomy.rows }).map((_, rowIndex) => (
                                    <div key={`premium-${rowIndex}`} className="flex gap-2 w-full justify-center">
                                        {Array.from({ length: airplaneConfig.premiumEconomy.seatsPerRow }).map((_, seatIndex) => {
                                            // Add aisle in the middle
                                            if (seatIndex === airplaneConfig.premiumEconomy.seatsPerRow / 2) {
                                                return <div key={`premium-aisle-${rowIndex}-${seatIndex}`} className="w-8"></div>;
                                            }

                                            const seatNumber =
                                                (airplaneConfig.firstClass.rows * airplaneConfig.firstClass.seatsPerRow) +
                                                (airplaneConfig.business.rows * airplaneConfig.business.seatsPerRow) +
                                                (rowIndex * airplaneConfig.premiumEconomy.seatsPerRow) +
                                                seatIndex + 1;

                                            const status = getSeatStatus(seatNumber);

                                            return (
                                                <button
                                                    key={`premium-seat-${seatNumber}`}
                                                    className={`w-8 h-8 rounded-md flex items-center justify-center border text-xs transition-all
                                                        ${status === 'booked' ? 'bg-gray-600 text-white cursor-not-allowed' :
                                                            status === 'selected' ? 'bg-primary text-white' :
                                                                status === 'premium-economy' ? 'bg-teal-500 hover:bg-teal-600 text-white' :
                                                                    'bg-gray-200 hover:bg-gray-300'}
                                                    `}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                    disabled={status === 'booked'}
                                                >
                                                    {getSeatLabel(seatNumber)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Economy Class */}
                    <div>
                        <div className="text-center mb-2">
                            <span className="inline-block bg-gray-300 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                                Economy Class
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            {Array.from({ length: airplaneConfig.economy.rows }).map((_, rowIndex) => (
                                <div key={`economy-${rowIndex}`} className="flex gap-1 w-full justify-center">
                                    {Array.from({ length: airplaneConfig.economy.seatsPerRow }).map((_, seatIndex) => {
                                        // Add aisle in the middle
                                        if (seatIndex === airplaneConfig.economy.seatsPerRow / 2) {
                                            return <div key={`economy-aisle-${rowIndex}-${seatIndex}`} className="w-4"></div>;
                                        }

                                        const seatNumber =
                                            (airplaneConfig.firstClass.rows * airplaneConfig.firstClass.seatsPerRow) +
                                            (airplaneConfig.business.rows * airplaneConfig.business.seatsPerRow) +
                                            (airplaneConfig.premiumEconomy.rows * airplaneConfig.premiumEconomy.seatsPerRow) +
                                            (rowIndex * airplaneConfig.economy.seatsPerRow) +
                                            seatIndex + 1;

                                        const status = getSeatStatus(seatNumber);

                                        return (
                                            <button
                                                key={`economy-seat-${seatNumber}`}
                                                className={`w-7 h-7 rounded-md flex items-center justify-center border text-xs transition-all
                                                    ${status === 'booked' ? 'bg-gray-600 text-white cursor-not-allowed' :
                                                        status === 'selected' ? 'bg-primary text-white' :
                                                            status === 'economy' ? 'bg-gray-300 hover:bg-gray-400' :
                                                                'bg-gray-200 hover:bg-gray-300'}
                                                `}
                                                onClick={() => handleSeatClick(seatNumber)}
                                                disabled={status === 'booked'}
                                            >
                                                {getSeatLabel(seatNumber)}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wings */}
                    <div className="absolute top-1/3 left-0 w-8 h-24 bg-gray-200 border-t border-r border-b border-gray-300 rounded-r-lg"></div>
                    <div className="absolute top-1/3 right-0 w-8 h-24 bg-gray-200 border-t border-l border-b border-gray-300 rounded-l-lg"></div>

                    {/* Tail */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-8 h-16 bg-blue-500 rounded-b-full"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FlightSeatLayout;