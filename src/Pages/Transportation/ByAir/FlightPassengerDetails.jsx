import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaPlane, FaArrowLeft, FaPassport, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const FlightPassengerDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            contactInfo: {
                name: '',
                email: '',
                phone: '',
            },
            primaryPassenger: {
                name: '',
                idType: 'passport',
                idNumber: ''
            }
        }
    });

    useEffect(() => {
        // Check if user is authenticated
        if (!user) {
            toast.error("Please login to continue with your flight booking");
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        // Get booking details from location state
        if (location.state?.bookingDetails) {
            // Check if any seats were selected
            const { selectedSeats } = location.state.bookingDetails;
            if (!selectedSeats || selectedSeats.length === 0) {
                // No seats selected, redirect back to flight selection
                toast.error("Please select at least one seat before proceeding");
                navigate('/transportation/by-air');
                return;
            }

            setBookingDetails(location.state.bookingDetails);
        } else {
            // No booking details, redirect back to seat selection
            navigate('/transportation/by-air');
        }

        // Pre-fill contact form with user data if available
        if (user) {
            setValue('contactInfo.name', user.displayName || '');
            setValue('contactInfo.email', user.email || '');
            setValue('primaryPassenger.name', user.displayName || '');
        }
    }, [location, navigate, setValue, user]);

    const onSubmit = async (data) => {
        if (!bookingDetails) return;

        setIsSubmitting(true);

        try {
            // Create booking in the backend API instead of Firebase
            const response = await axiosPublic.post('/flight-bookings', {
                flightId: bookingDetails.flightId,
                date: bookingDetails.date,
                seatNumbers: bookingDetails.selectedSeats,
                sessionId: bookingDetails.sessionId,
                contactInfo: data.contactInfo,
                passengers: [data.primaryPassenger], // Changed from primaryPassenger to passengers array
                totalPrice: bookingDetails.totalPrice
            });

            toast.success("Booking details confirmed!");

            // Navigate to payment page instead of confirmation
            navigate('/transportation/flight-payment', {
                state: {
                    bookingId: response.data.bookingId,
                    bookingReference: response.data.bookingReference,
                    amount: bookingDetails.totalPrice,
                    bookingType: 'flight',
                    bookingDetails: {
                        ...bookingDetails,
                        bookingId: response.data.bookingId,
                        reference: response.data.bookingReference,
                        contactInfo: data.contactInfo,
                        primaryPassenger: data.primaryPassenger
                    }
                }
            });
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error(error.response?.data?.error || "Failed to create booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!bookingDetails) {
        return (
            <div className="container mx-auto py-10 px-4 text-center">
                <div className="animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-primary rounded-full mb-4" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="text-lg text-gray-600">Loading booking details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose">
            {/* Back button */}
            <motion.div
                className="mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to={`/transportation/flight-seat-plan/${bookingDetails.flightId}`}
                    className="group inline-flex items-center text-primary hover:text-primary-dark transition-all bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
                    state={{ flightData: { id: bookingDetails.flightId }, date: bookingDetails.date }}
                >
                    <motion.div
                        className="mr-2"
                        whileHover={{ x: -3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaArrowLeft />
                    </motion.div>
                    <span className="font-medium">Back to Seat Selection</span>
                </Link>
            </motion.div>

            {/* Page title */}
            <motion.h1
                className="text-3xl font-bold text-CharcoleDark mb-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Complete Your Flight Booking
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking summary (right column on desktop) */}
                <motion.div
                    className="bg-white rounded-xl shadow-md overflow-hidden lg:order-last"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="bg-gradient-to-r from-blue-500 to-primary p-6 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                            <FaPlane className="mr-2" />
                            Flight Summary
                        </h2>
                        <p className="opacity-90 mt-1">{bookingDetails.airline}</p>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm">Flight</p>
                                <p className="font-medium">{bookingDetails.flightName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Route</p>
                                <p className="font-medium">{bookingDetails.route}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Date & Time</p>
                                <p className="font-medium">{bookingDetails.date} {bookingDetails.time}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Seats</p>
                                <p className="font-medium">{bookingDetails.selectedSeats.join(", ")}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Total Price</p>
                                <p className="text-xl font-bold text-primary">${bookingDetails.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Passenger form */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Contact Information */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                <FaUser className="mr-2 text-primary" />
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="John Doe"
                                            {...register("contactInfo.name", { required: "Name is required" })}
                                        />
                                    </div>
                                    {errors.contactInfo?.name && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="email@example.com"
                                            {...register("contactInfo.email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.contactInfo?.email && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="+1 (123) 456-7890"
                                            {...register("contactInfo.phone", { required: "Phone number is required" })}
                                        />
                                    </div>
                                    {errors.contactInfo?.phone && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.phone.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Primary Passenger Details */}
                        <div className="p-6 border-t border-gray-100">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                <FaPassport className="mr-2 text-primary" />
                                Primary Passenger Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name (as on ID)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.primaryPassenger?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="John Michael Doe"
                                            {...register("primaryPassenger.name", { required: "Passenger name is required" })}
                                        />
                                    </div>
                                    {errors.primaryPassenger?.name && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">ID Type</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="text-gray-400" />
                                        </div>
                                        <select
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.primaryPassenger?.idType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white`}
                                            {...register("primaryPassenger.idType", { required: "ID type is required" })}
                                        >
                                            <option value="passport">Passport</option>
                                            <option value="national-id">National ID</option>
                                            <option value="driver-license">Driver's License</option>
                                        </select>
                                    </div>
                                    {errors.primaryPassenger?.idType && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.idType.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">ID Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`w-full pl-10 pr-3 py-2 border ${errors.primaryPassenger?.idNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="AB1234567"
                                            {...register("primaryPassenger.idNumber", { required: "ID number is required" })}
                                        />
                                    </div>
                                    {errors.primaryPassenger?.idNumber && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.idNumber.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Information Section */}
                        <div className="p-6 border-t border-gray-100">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                <FaCreditCard className="mr-2 text-primary" />
                                Payment Information
                            </h2>
                            <p className="text-gray-600 mb-4">
                                You'll be redirected to our secure payment gateway after submitting this form.
                            </p>
                        </div>

                        {/* Terms and conditions + Submit button */}
                        <div className="p-6 bg-gray-50">
                            <div className="mb-6">
                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        {...register("termsAccepted", { required: "You must accept the terms and conditions" })}
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and the airline's fare rules.
                                    </label>
                                </div>
                                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>}
                            </div>

                            <div className="flex justify-end">
                                <motion.button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-primary-dark disabled:bg-gray-300 disabled:text-gray-500"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="inline-block mr-2 animate-spin">↻</span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaCreditCard className="mr-2 inline-block" />
                                            Proceed to Payment
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default FlightPassengerDetails;