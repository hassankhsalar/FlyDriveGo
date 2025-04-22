import React, { useState, useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const BookingConfirmation = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const axiosPublic = useAxiosPublic();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            // Get booking info from location.state OR from URL query parameters
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
                    response = await axiosPublic.get(`/bus-bookings/${bookingId}`);
                } else if (bookingReference) {
                    // Try to get by reference only first
                    try {
                        response = await axiosPublic.get(`/bus-bookings/find?reference=${bookingReference}`);
                    } catch (referenceError) {
                        // If reference-only search fails and we have email from state, try with both
                        const email = location.state?.bookingDetails?.contactInfo?.email;
                        if (email) {
                            response = await axiosPublic.get(`/bus-bookings/find?reference=${bookingReference}&email=${email}`);
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
                    <p className="text-gray-700 mb-4">We couldn't retrieve your booking information.</p>
                    <Link to="/transportation/by-road" className="inline-block bg-primary text-white py-2 px-6 rounded-lg">
                        Return to Bus Search
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
                            <FaTicketAlt className="mr-2" /> Ticket Details
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-gray-600 text-sm">Bus</h3>
                                <p className="font-semibold">{booking.busDetails.name}</p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Route</h3>
                                <p className="font-semibold flex items-center">
                                    <FaMapMarkerAlt className="mr-1 text-primary" /> {booking.busDetails.route}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Date</h3>
                                <p className="font-semibold flex items-center">
                                    <FaCalendarAlt className="mr-1 text-primary" /> {booking.date}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Departure Time</h3>
                                <p className="font-semibold flex items-center">
                                    <FaClock className="mr-1 text-primary" /> {booking.busDetails.departureTime}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Seat Numbers</h3>
                                <p className="font-semibold">{booking.seatNumbers.join(", ")}</p>
                            </div>

                            <div>
                                <h3 className="text-gray-600 text-sm">Total Price</h3>
                                <p className="font-bold text-primary text-xl">${booking.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="border-t mt-6 pt-6">
                            <h3 className="font-semibold mb-2">Primary Passenger</h3>
                            <p>{booking.primaryPassenger.name} • {booking.primaryPassenger.idType}: {booking.primaryPassenger.idNumber}</p>
                        </div>

                        <div className="border-t mt-6 pt-6">
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <p>{booking.contactInfo.name} • {booking.contactInfo.email} • {booking.contactInfo.phone}</p>
                        </div>
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

export default BookingConfirmation;
