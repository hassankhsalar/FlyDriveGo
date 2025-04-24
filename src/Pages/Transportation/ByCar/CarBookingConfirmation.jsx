import React, { useState, useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaCarSide, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const CarBookingConfirmation = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const axiosPublic = useAxiosPublic();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            const bookingId = location.state?.bookingId;
            const bookingReference = location.state?.bookingReference || searchParams.get('reference');

            if (!bookingId && !bookingReference) {
                setError("No booking reference provided");
                setLoading(false);
                return;
            }

            try {
                let response;
                if (bookingId) {
                    response = await axiosPublic.get(`/car-bookings/${bookingId}`);
                } else if (bookingReference) {
                    // Try to get by reference only first
                    try {
                        response = await axiosPublic.get(`/car-bookings/find?reference=${bookingReference}`);
                    } catch (referenceError) {
                        // If reference-only search fails and we have email from state, try with both
                        const email = location.state?.bookingDetails?.contactInfo?.email;
                        if (email) {
                            response = await axiosPublic.get(`/car-bookings/find?reference=${bookingReference}&email=${email}`);
                        } else {
                            throw referenceError;
                        }
                    }
                }

                setBooking(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setError("Failed to retrieve booking information. Please check your reference number.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [location, axiosPublic, searchParams]);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="container mx-auto py-12 px-4">
                <div className="bg-red-50 p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Booking Information Not Found</h2>
                    <p className="text-gray-700 mb-4">{error || "We couldn't retrieve your booking information."}</p>
                    <Link to="/transportation/by-car" className="inline-block bg-primary text-white py-2 px-6 rounded-lg">
                        Return to Car Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 font-red-rose">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="bg-green-50 rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <FaCheck className="text-5xl text-green-500" />
                </motion.div>

                <motion.h1
                    className="text-3xl font-bold text-center mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Booking Confirmed!
                </motion.h1>

                <motion.p
                    className="text-gray-600 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Your booking reference is: <span className="font-bold text-primary">{booking.bookingReference}</span>
                </motion.p>

                <motion.div
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-primary text-white p-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <FaCarSide className="mr-2" /> Rental Details
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-gray-600 text-sm">Car</h3>
                                <p className="font-semibold">{booking.carName}</p>
                            </div>

                            {booking.carType && (
                                <div>
                                    <h3 className="text-gray-600 text-sm">Type</h3>
                                    <p className="font-semibold">{booking.carType}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="text-gray-600 text-sm">Pick-up Date</h3>
                                <p className="font-semibold flex items-center">
                                    <FaCalendarAlt className="mr-1 text-primary" /> {new Date(booking.startDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Return Date</h3>
                                <p className="font-semibold flex items-center">
                                    <FaCalendarAlt className="mr-1 text-primary" /> {new Date(booking.endDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Duration</h3>
                                <p className="font-semibold flex items-center">
                                    <FaClock className="mr-1 text-primary" /> {booking.totalDays} days
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Total Price</h3>
                                <p className="font-bold text-primary text-xl">${booking.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="border-t mt-6 pt-6">
                            <h3 className="font-semibold mb-2">Driver Information</h3>
                            <p>{booking.driverInfo.name} • {booking.driverInfo.licenseNumber}</p>
                        </div>

                        <div className="border-t mt-6 pt-6">
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <p>{booking.contactInfo.name} • {booking.contactInfo.email} • {booking.contactInfo.phone}</p>
                        </div>

                        {booking.additionalOptions && (
                            <div className="border-t mt-6 pt-6">
                                <h3 className="font-semibold mb-2">Additional Options</h3>
                                <ul className="list-disc list-inside">
                                    {booking.additionalOptions.insurance && <li>Insurance Protection</li>}
                                    {booking.additionalOptions.gps && <li>GPS Navigation System</li>}
                                    {booking.additionalOptions.childSeat && <li>Child Safety Seat</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to="/transportation"
                        className="bg-primary text-white px-8 py-3 rounded-lg font-medium inline-block"
                    >
                        Return to Transportation
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CarBookingConfirmation;
