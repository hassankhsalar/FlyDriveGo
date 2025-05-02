import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlane, FaTicketAlt, FaPrint, FaDownload, FaEnvelope, FaHome, FaPhone, FaUser, FaIdCard, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const FlightBookingConfirmation = () => {
    const { bookingId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const ticketRef = useRef(null);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            setLoading(true);
            try {
                // If we have booking data from navigation state, use it
                if (location.state?.bookingDetails) {
                    setBooking(location.state.bookingDetails);
                    setLoading(false);
                } else if (bookingId) {
                    // Otherwise fetch from API using the ID from URL
                    const response = await axiosPublic.get(`/flight-bookings/${bookingId}`);
                    setBooking(response.data);
                    setLoading(false);
                } else {
                    // No booking ID, redirect to homepage
                    toast.error("Booking information not found");
                    navigate('/');
                }
            } catch (error) {
                console.error("Error fetching booking details:", error);
                toast.error("Failed to load booking details");
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId, location.state, axiosPublic, navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        if (!ticketRef.current) return;

        toast.info("Preparing your ticket for download...");

        const ticketElement = ticketRef.current;
        html2canvas(ticketElement, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`flight-ticket-${booking?.bookingReference || bookingId}.pdf`);

            toast.success("Ticket downloaded successfully!");
        });
    };

    const handleEmailTicket = () => {
        toast.success("E-ticket sent to your email address!");
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (reviewRating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setSubmittingReview(true);

        try {
            // Mock submit - in real app, would post to API
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Thank you for your feedback!");
            setReviewText('');
            setReviewRating(0);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit your review");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 rounded-xl shadow-sm">
                <div className="text-center">
                    <motion.div
                        className="w-20 h-20 mb-8 mx-auto relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        className="text-xl font-medium text-primary"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Preparing your ticket...
                    </motion.p>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 rounded-xl shadow-sm">
                <div className="text-center">
                    <motion.div
                        className="text-4xl text-gray-300 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaTicketAlt />
                    </motion.div>
                    <motion.p
                        className="text-xl font-medium text-CharcoleDark mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Booking Not Found
                    </motion.p>
                    <motion.p
                        className="text-gray-600 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        We couldn't find the booking details you're looking for.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/transportation/by-air"
                            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Browse Flights
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose">
            {/* Success message */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                    <FaCheckCircle className="text-4xl text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-CharcoleDark mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600">
                    Your flight booking has been successfully processed and confirmed.
                </p>
                <div className="mt-4 inline-block bg-blue-100 px-4 py-2 rounded-lg">
                    <p className="text-primary font-medium">
                        Booking Reference: <span className="font-bold">{booking.bookingReference || booking.reference}</span>
                    </p>
                </div>
            </motion.div>

            {/* Ticket and actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Ticket */}
                <div className="md:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden print:shadow-none"
                        ref={ticketRef}
                    >
                        {/* Ticket header */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-primary p-6 text-white print:bg-blue-600">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="w-full h-full flex items-center justify-center">
                                    <FaPlane className="text-9xl transform -rotate-45" />
                                </div>
                            </div>

                            <div className="relative flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center">
                                        <FaTicketAlt className="mr-2" />
                                        Flight Ticket
                                    </h2>
                                    <p className="opacity-90 mt-1">{booking.airline}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm opacity-80">Booking Reference</p>
                                    <p className="text-xl font-bold">{booking.bookingReference || booking.reference}</p>
                                </div>
                            </div>

                            <div className="relative mt-6 flex justify-between items-center">
                                <div>
                                    <p className="text-sm opacity-80">From</p>
                                    <p className="text-lg font-bold">{booking.route?.split(" to ")[0]}</p>
                                </div>
                                <div className="flex-1 mx-4 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-white opacity-30"></div>
                                    <FaPlane className="mx-4 text-xl" />
                                    <div className="w-full h-0.5 bg-white opacity-30"></div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm opacity-80">To</p>
                                    <p className="text-lg font-bold">{booking.route?.split(" to ")[1]}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket body */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-gray-500 text-sm">Flight</p>
                                    <p className="font-medium">{booking.flightName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Airline</p>
                                    <p className="font-medium">{booking.airline}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Date</p>
                                    <p className="font-medium">{booking.date}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Departure Time</p>
                                    <p className="font-medium">{booking.time}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Passenger</p>
                                    <p className="font-medium">{booking.primaryPassenger?.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">ID Type & Number</p>
                                    <p className="font-medium capitalize">
                                        {booking.primaryPassenger?.idType?.replace("-", " ")} - {booking.primaryPassenger?.idNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-500 text-sm">Seats</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {booking.selectedSeats.map((seat, index) => (
                                        <span
                                            key={index}
                                            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md font-medium"
                                        >
                                            {seat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-500 text-sm">Contact Information</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                                    <div className="flex items-center">
                                        <FaUser className="text-gray-400 mr-2" />
                                        <span>{booking.contactInfo?.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaEnvelope className="text-gray-400 mr-2" />
                                        <span>{booking.contactInfo?.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaPhone className="text-gray-400 mr-2" />
                                        <span>{booking.contactInfo?.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Amount</p>
                                    <p className="text-xl font-bold text-primary">${booking.totalPrice?.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Payment Status</p>
                                    <p className="font-medium uppercase text-green-600">PAID</p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket footer */}
                        <div className="p-4 bg-gray-50 text-xs text-gray-500 print:bg-white">
                            <p>Please arrive at the airport at least 2 hours before your scheduled departure time.</p>
                            <p>For any changes or cancellations, please contact us with your booking reference number.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="print:hidden"
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-CharcoleDark mb-4">Ticket Actions</h3>

                            <div className="space-y-4">
                                <button
                                    onClick={handlePrint}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-primary py-3 rounded-lg transition-colors"
                                >
                                    <FaPrint /> Print Ticket
                                </button>

                                <button
                                    onClick={handleDownloadPDF}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-primary py-3 rounded-lg transition-colors"
                                >
                                    <FaDownload /> Download as PDF
                                </button>

                                <button
                                    onClick={handleEmailTicket}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-primary py-3 rounded-lg transition-colors"
                                >
                                    <FaEnvelope /> Email Ticket
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <Link
                                    to="/transportation/by-air"
                                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors"
                                >
                                    <FaHome /> Return to Flights
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-6 bg-white rounded-xl shadow-md overflow-hidden print:hidden"
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-CharcoleDark mb-4">Share Your Experience</h3>

                            <form onSubmit={handleSubmitReview}>
                                <div className="mb-4">
                                    <p className="text-gray-600 mb-2">Rate your booking experience:</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewRating(star)}
                                                className="text-2xl focus:outline-none"
                                            >
                                                <FaStar className={`${reviewRating >= star ? 'text-yellow-400' : 'text-gray-300'} transition-colors`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows={4}
                                        placeholder="Share your thoughts about the booking process..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submittingReview}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors disabled:bg-gray-300"
                                >
                                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden mb-8 print:hidden"
            >
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-CharcoleDark mb-4">Important Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-medium text-CharcoleDark mb-2">Check-in</h4>
                            <p className="text-gray-600 text-sm">
                                Online check-in is available 24 hours before departure. You can also check in at the airport counter at least 2 hours before your flight.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-CharcoleDark mb-2">Baggage</h4>
                            <p className="text-gray-600 text-sm">
                                You are allowed one carry-on bag (max 7kg) and one checked bag (max 23kg). Additional or overweight baggage may incur extra fees.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-CharcoleDark mb-2">Changes & Cancellations</h4>
                            <p className="text-gray-600 text-sm">
                                Changes to your booking may be subject to fees. For cancellations, please contact customer service at least 24 hours before departure.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FlightBookingConfirmation;