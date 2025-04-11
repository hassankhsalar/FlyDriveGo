import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Car image */}
            <div className="relative">
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-lg font-semibold">
                    ${car.price}/day
                </div>
                {!car.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white font-bold text-xl">UNAVAILABLE</p>
                    </div>
                )}
            </div>

            {/* Car details */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-CharcoleDark">{car.name}</h3>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                        {car.type}
                    </span>
                </div>

                {/* Car ratings */}
                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{car.rating.toFixed(1)} ({Math.floor(car.rating * 10)} reviews)</span>
                </div>

                {/* Car features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {car.transmission}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {car.fuelType}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {car.seats} Seats
                    </div>
                </div>

                {/* Key features */}
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                        {car.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                {feature}
                            </span>
                        ))}
                        {car.features.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                +{car.features.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Call to action */}
                <div className="flex justify-between items-center">
                    <Link
                        to={`/transportation/car-details/${car.id}`}
                        className="text-primary hover:underline text-sm font-medium"
                    >
                        View Details
                    </Link>
                    <Link
                        to={car.available ? `/transportation/car-reservation/${car.id}` : "#"}
                        className={`px-4 py-2 rounded-lg font-medium ${car.available
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {car.available ? 'Book Now' : 'Unavailable'}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCard;
