import React from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHeadset, FaRedo, FaPlane } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const FlightPaymentErrorHandler = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();

    // Get error details from location state OR query parameters
    const bookingId = location.state?.bookingId || searchParams.get('bookingId');
    const bookingReference = location.state?.bookingReference || searchParams.get('reference');
    const paymentId = location.state?.paymentId || searchParams.get('paymentId');
    const paymentMethod = location.state?.paymentMethod || searchParams.get('paymentMethod');

    // Function to retry the booking update
    const handleRetryUpdate = async () => {
        try {
            toast.loading('Attempting to recover flight booking status...');

            // Retry updating the booking payment status with the payment-recovery endpoint
            await axiosSecure.patch(`/flight-bookings/${bookingId}/payment-recovery`, {
                paymentStatus: 'paid',
                paymentId: paymentId,
                paymentMethod: paymentMethod || 'card',
                paymentTimestamp: new Date()
            });

            toast.dismiss();
            toast.success('Recovery successful! Your flight booking is now confirmed.');

            // Navigate to flight booking confirmation after successful recovery
            window.location.href = `/transportation/flight-booking-confirmation/${bookingId}`;
        } catch (err) {
            toast.dismiss();
            toast.error('Recovery attempt failed. Please contact customer support.');
            console.error('Error during recovery:', err);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 font-red-rose">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <motion.div
                    className="text-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <div className="flex justify-center items-center mb-4">
                        <FaExclamationTriangle className="text-amber-500 text-5xl" />
                        <FaPlane className="text-primary text-4xl ml-3 transform -rotate-45" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Processed But Flight Booking Incomplete</h1>
                    <p className="text-gray-600">
                        Good news! Your payment was successfully processed, but we encountered an issue updating your flight booking status.
                    </p>
                </motion.div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                    <p className="text-amber-700">
                        <span className="font-bold">Booking Reference:</span> {bookingReference || 'Not available'}
                    </p>
                    <p className="text-amber-700">
                        <span className="font-bold">Payment ID:</span> {paymentId || 'Not available'}
                    </p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        className="w-full py-3 bg-primary text-white rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRetryUpdate}
                    >
                        <FaRedo className="mr-2" /> Retry Confirming Flight Booking
                    </motion.button>

                    <Link to="/contact" className="w-full block py-3 border border-primary text-primary rounded-lg text-center">
                        <FaHeadset className="inline mr-2" /> Contact Customer Support
                    </Link>

                    <Link to="/transportation/by-air" className="block text-center text-gray-600 hover:underline mt-4">
                        Return to Flight Booking
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FlightPaymentErrorHandler;