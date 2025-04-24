import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCreditCard, FaIdCard, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const PassengerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosPublic = useAxiosPublic();

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
        // Get booking details from location state
        if (location.state?.bookingDetails) {
            // Check if any seats were selected
            const { selectedSeats } = location.state.bookingDetails;
            if (!selectedSeats || selectedSeats.length === 0) {
                // No seats selected, redirect back to bus selection
                toast.error("Please select at least one seat before proceeding");
                navigate('/transportation/by-road');
                return;
            }

            setBookingDetails(location.state.bookingDetails);
        } else {
            // No booking details, redirect back to seat selection
            navigate('/transportation/by-road');
        }

        // Check if user is logged in
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Pre-fill contact form with user data if available
                setValue('contactInfo.name', currentUser.displayName || '');
                setValue('contactInfo.email', currentUser.email || '');
                setValue('primaryPassenger.name', currentUser.displayName || '');
            }
        });

        return () => unsubscribe();
    }, [location, navigate, setValue]);

    const onSubmit = async (data) => {
        if (!bookingDetails) return;

        setIsSubmitting(true);

        try {
            // Create booking in the backend API instead of Firebase
            const response = await axiosPublic.post('/bus-bookings', {
                busId: bookingDetails.busId,
                date: bookingDetails.date,
                seatNumbers: bookingDetails.selectedSeats,
                sessionId: bookingDetails.sessionId,
                contactInfo: data.contactInfo,
                primaryPassenger: data.primaryPassenger,
                totalPrice: bookingDetails.totalPrice
            });

            toast.success("Booking confirmed successfully!");

            // Navigate to payment page with booking reference
            navigate('/transportation/payment', {
                state: {
                    bookingId: response.data.bookingId,
                    bookingReference: response.data.bookingReference,
                    amount: bookingDetails.totalPrice,
                    bookingDetails: {
                        ...bookingDetails,
                        contactInfo: data.contactInfo,
                        primaryPassenger: data.primaryPassenger
                    }
                }
            });
        } catch (error) {
            console.error("Error creating booking:", error);
            if (error.response?.data?.unavailableSeats) {
                toast.error(`Some seats are no longer available: ${error.response.data.unavailableSeats.join(', ')}`);
            } else {
                toast.error("There was an error processing your booking. Please try again.");
            }
            setIsSubmitting(false);
        }
    };

    if (!bookingDetails) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading booking details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden -z-10 opacity-5">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400 rounded-full"></div>
            </div>

            {/* Back button */}
            <motion.div
                className="mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to={`/transportation/seat-plan/${bookingDetails.busId}`}
                    state={{ busData: { id: bookingDetails.busId } }}
                    className="group inline-flex items-center text-primary hover:text-primary-dark transition-all bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
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
                className="text-3xl font-bold text-CharcoleDark mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Passenger Details
            </motion.h1>

            {/* Booking summary */}
            <motion.div
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Booking Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm">Bus</p>
                        <p className="font-medium">{bookingDetails.busName}</p>
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
            </motion.div>

            {/* Passenger form */}
            <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    {/* Contact Information */}
                    <div className="mb-8">
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
                                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                        placeholder="+1 234 567 8900"
                                        {...register("contactInfo.phone", { required: "Phone number is required" })}
                                    />
                                </div>
                                {errors.contactInfo?.phone && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.phone.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Primary Passenger Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                            <FaIdCard className="mr-2 text-primary" />
                            Primary Passenger Information
                        </h2>

                        <div className="p-6 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-2 border ${errors.primaryPassenger?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                        placeholder="Passenger Name"
                                        {...register("primaryPassenger.name", { required: "Passenger name is required" })}
                                    />
                                    {errors.primaryPassenger?.name && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">ID Type</label>
                                    <select
                                        className={`w-full px-4 py-2 border ${errors.primaryPassenger?.idType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                        {...register("primaryPassenger.idType", { required: "ID type is required" })}
                                    >
                                        <option value="passport">Passport</option>
                                        <option value="nationalId">National ID</option>
                                        <option value="drivingLicense">Driving License</option>
                                    </select>
                                    {errors.primaryPassenger?.idType && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.idType.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">ID Number</label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-2 border ${errors.primaryPassenger?.idNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                        placeholder="ID Number"
                                        {...register("primaryPassenger.idNumber", { required: "ID number is required" })}
                                    />
                                    {errors.primaryPassenger?.idNumber && <p className="text-red-500 text-xs mt-1">{errors.primaryPassenger.idNumber.message}</p>}
                                </div>
                            </div>

                            {bookingDetails?.selectedSeats.length > 1 && (
                                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                    <p className="text-blue-700 text-sm">
                                        <strong>Note:</strong> You've booked {bookingDetails.selectedSeats.length} seats.
                                        Only the primary passenger's details are required.
                                        Seat numbers {bookingDetails.selectedSeats.join(", ")} are reserved for your group.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                            <FaCreditCard className="mr-2 text-primary" />
                            Payment Information
                        </h2>
                        <p className="text-gray-600 mb-4">
                            You'll be redirected to our secure payment gateway after submitting this form.
                        </p>

                        {/* Terms and Privacy Policy */}
                        <div className="mb-6">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="mt-1 mr-2"
                                    {...register("termsAccepted", { required: "You must accept the terms" })}
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the <a href="/terms" className="text-primary hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                                </span>
                            </label>
                            {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <motion.button
                                type="submit"
                                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-all flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>Proceed to Payment</>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PassengerDetails;
