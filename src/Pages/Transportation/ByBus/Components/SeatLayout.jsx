import React from 'react';
import Seat from './Seat';
import { FaWheelchair, FaDoorOpen } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi'; // Changed from FaSteeringWheel to GiSteeringWheel
import { motion } from 'framer-motion';

const SeatLayout = ({ busDetails, selectedSeats, handleSeatClick }) => {
    const rows = 10;
    const seatsPerRow = 4;

    // Seat naming convention (A, B, C, D for columns)
    const seatColumns = ['A', 'B', 'C', 'D'];

    const getSeatStatus = (seatNumber) => {
        if (busDetails?.bookedSeats?.includes(seatNumber)) {
            return 'booked';
        }
        if (selectedSeats.includes(seatNumber)) {
            return 'selected';
        }
        if (busDetails?.premiumSeats?.includes(seatNumber)) {
            return 'premium';
        }
        return 'available';
    };

    const isPremiumSeat = (seatNumber) => {
        return busDetails?.premiumSeats?.includes(seatNumber);
    };

    // Get seat label (e.g., 1A, 1B, 2C, etc.)
    const getSeatLabel = (rowIndex, columnIndex) => {
        return `${rowIndex + 1}${seatColumns[columnIndex]}`;
    };

    return (
        <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Bus front with steering wheel and door */}
            <div className="relative mb-8">
                <div className="w-full bg-gray-100 rounded-t-3xl p-4 border border-gray-200 relative">
                    {/* Steering wheel - using GiSteeringWheel instead */}
                    <div className="absolute left-10 top-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
                            <GiSteeringWheel className="text-gray-500 text-xl" /> {/* Changed from FaSteeringWheel to GiSteeringWheel */}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">Driver</p>
                    </div>

                    {/* Front door */}
                    <div className="absolute right-10 top-4">
                        <div className="w-12 h-16 bg-blue-100 rounded-md flex items-center justify-center border border-blue-200">
                            <FaDoorOpen className="text-blue-400 text-xl" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">Door</p>
                    </div>

                    {/* Bus front label */}
                    <div className="text-center w-full mt-16">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                            FRONT
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend - directly inside the layout */}
            <div className="flex justify-center mb-4 bg-gray-50 py-2 rounded-md">
                <div className="flex gap-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">Premium</span>
                    </div>
                    <div className="flex items-center">
                        <FaWheelchair className="text-blue-500 w-3 h-3 mr-1" />
                        <span className="text-xs text-gray-600">Accessible</span>
                    </div>
                </div>
            </div>

            {/* Seats layout with aisle */}
            <div className="relative bg-white rounded-b-3xl border border-gray-200 p-6">
                {/* Seat labels - top */}
                <div className="grid grid-cols-4 mb-4 px-6">
                    <div className="col-span-2 flex justify-around">
                        <span className="text-xs font-medium text-gray-500">A</span>
                        <span className="text-xs font-medium text-gray-500">B</span>
                    </div>
                    <div className="col-span-2 flex justify-around">
                        <span className="text-xs font-medium text-gray-500">C</span>
                        <span className="text-xs font-medium text-gray-500">D</span>
                    </div>
                </div>

                {/* Main seats area with aisle */}
                <div className="grid gap-y-5">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex justify-between items-center">
                            {/* Row number */}
                            <div className="w-6 text-center">
                                <span className="text-xs font-medium text-gray-500">{rowIndex + 1}</span>
                            </div>

                            {/* Left side (seats A and B) */}
                            <div className="flex gap-3">
                                {Array.from({ length: 2 }).map((_, colIndex) => {
                                    const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
                                    const status = getSeatStatus(seatNumber);
                                    const seatLabel = getSeatLabel(rowIndex, colIndex);
                                    return (
                                        <Seat
                                            key={`L${colIndex}`}
                                            seatNumber={seatNumber}
                                            seatLabel={seatLabel}
                                            status={status}
                                            isPremium={isPremiumSeat(seatNumber)}
                                            onClick={handleSeatClick}
                                            isAccessible={rowIndex === 0 && colIndex === 0} // First seat is accessible
                                        />
                                    );
                                })}
                            </div>

                            {/* Center aisle */}
                            <div className="w-12 h-1 bg-gray-100 mx-3"></div>

                            {/* Right side (seats C and D) */}
                            <div className="flex gap-3">
                                {Array.from({ length: 2 }).map((_, colIndex) => {
                                    const seatNumber = rowIndex * seatsPerRow + colIndex + 3;
                                    const status = getSeatStatus(seatNumber);
                                    const seatLabel = getSeatLabel(rowIndex, colIndex + 2);
                                    return (
                                        <Seat
                                            key={`R${colIndex}`}
                                            seatNumber={seatNumber}
                                            seatLabel={seatLabel}
                                            status={status}
                                            isPremium={isPremiumSeat(seatNumber)}
                                            onClick={handleSeatClick}
                                            isAccessible={rowIndex === 0 && colIndex === 1} // Front right seat is accessible
                                        />
                                    );
                                })}
                            </div>

                            {/* Row number */}
                            <div className="w-6 text-center">
                                <span className="text-xs font-medium text-gray-500">{rowIndex + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bus rear */}
                <div className="w-full mt-6 text-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                        REAR
                    </span>
                </div>

                {/* Emergency exit markings */}
                <div className="absolute top-1/2 left-1 -translate-y-1/2 -rotate-90">
                    <span className="text-xs text-red-500 font-medium">EMERGENCY EXIT</span>
                </div>
                <div className="absolute top-1/2 right-1 -translate-y-1/2 rotate-90">
                    <span className="text-xs text-red-500 font-medium">EMERGENCY EXIT</span>
                </div>
            </div>
        </motion.div>
    );
};

export default SeatLayout;
