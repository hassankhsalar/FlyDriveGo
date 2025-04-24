import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUser, FaIdCard, FaPhone, FaEnvelope, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { getAuth } from 'firebase/auth';

const CarReservationDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDetails } = location.state || {};
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            contactInfo: {
                name: '',
                email: '',
                phone: '',
            },
            driverInfo: {
                name: '',
                licenseNumber: '',
                licenseState: '',
                dateOfBirth: ''
            },
            additionalOptions: {
                insurance: false,
                gps: false,
                childSeat: false
            }
        }
    });

    React.useEffect(() => {
        // Check if booking details exist
        if (!bookingDetails) {
            toast.error("Please select a car first");
            navigate('/transportation/by-car');
            return;
        }

        // Pre-fill with user data if logged in
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setValue('contactInfo.name', currentUser.displayName || '');
                setValue('contactInfo.email', currentUser.email || '');
                setValue('driverInfo.name', currentUser.displayName || '');
            }
        });

        return () => unsubscribe();
    }, [location, navigate, setValue, bookingDetails]);

    const onSubmit = async (data) => {
        if (!bookingDetails) return;

        setIsSubmitting(true);

        try {
            // Calculate total price including any add-ons
            let totalPrice = bookingDetails.totalPrice;
            if (data.additionalOptions.insurance) totalPrice += 15 * bookingDetails.totalDays;
            if (data.additionalOptions.gps) totalPrice += 5 * bookingDetails.totalDays;
            if (data.additionalOptions.childSeat) totalPrice += 8 * bookingDetails.totalDays;

            // Create reservation in the backend
            const response = await axiosPublic.post('/car-bookings', {
                carId: bookingDetails.carId,
                carName: bookingDetails.carName,
                startDate: bookingDetails.startDate,
                endDate: bookingDetails.endDate,
                totalDays: bookingDetails.totalDays,
                basePrice: bookingDetails.totalPrice,
                contactInfo: data.contactInfo,
                driverInfo: data.driverInfo,
                additionalOptions: data.additionalOptions,
                totalPrice: totalPrice,
                imageUrl: bookingDetails.imageUrl
            });

            toast.success("Reservation details confirmed!");

            // Navigate to payment page with booking reference
            navigate('/transportation/car-payment', {
                state: {
                    bookingId: response.data.bookingId,
                    bookingReference: response.data.bookingReference,
                    amount: totalPrice,
                    bookingDetails: {
                        ...bookingDetails,
                        contactInfo: data.contactInfo,
                        driverInfo: data.driverInfo,
                        additionalOptions: data.additionalOptions,
                        totalPrice: totalPrice
                    }
                }
            });
        } catch (error) {
            console.error("Error creating reservation:", error);
            toast.error("There was an error processing your reservation. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!bookingDetails) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-CharcoleDark mb-4">No Booking Information</h2>
                    <Link to="/transportation/by-car" className="inline-block bg-primary text-white py-2 px-6 rounded-lg">
                        Return to Car Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 font-red-rose">
            {/* Back button */}
            <div className="mb-8">
                <Link
                    to={`/transportation/car-details/${bookingDetails.carId}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    <span className="font-medium">Back to Car Details</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-primary text-white p-6">
                            <h1 className="text-2xl font-bold">Complete Your Reservation</h1>
                            <p className="text-blue-100">Please fill in your details to confirm your booking.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            {/* Contact Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                    <FaUser className="mr-2 text-primary" />
                                    Contact Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            {...register('contactInfo.name', { required: "Name is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.contactInfo?.name && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            {...register('contactInfo.email', {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.contactInfo?.email && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            {...register('contactInfo.phone', { required: "Phone number is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.contactInfo?.phone && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.phone.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Driver Information */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                    <FaIdCard className="mr-2 text-primary" />
                                    Driver Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver's Full Name</label>
                                        <input
                                            type="text"
                                            {...register('driverInfo.name', { required: "Driver's name is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.driverInfo?.name && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number</label>
                                        <input
                                            type="text"
                                            {...register('driverInfo.licenseNumber', { required: "License number is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.driverInfo?.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.licenseNumber.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">License State/Province</label>
                                        <input
                                            type="text"
                                            {...register('driverInfo.licenseState', { required: "License state is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.driverInfo?.licenseState && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.licenseState.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            {...register('driverInfo.dateOfBirth', { required: "Date of birth is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.driverInfo?.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.dateOfBirth.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Additional Options</h2>

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="insurance"
                                            {...register('additionalOptions.insurance')}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="insurance" className="ml-2 text-gray-700">
                                            <span className="font-medium">Add Insurance Protection</span> - $15/day
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="gps"
                                            {...register('additionalOptions.gps')}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="gps" className="ml-2 text-gray-700">
                                            <span className="font-medium">GPS Navigation System</span> - $5/day
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="childSeat"
                                            {...register('additionalOptions.childSeat')}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="childSeat" className="ml-2 text-gray-700">
                                            <span className="font-medium">Child Safety Seat</span> - $8/day
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-8">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        {...register('termsAccepted', { required: "You must accept the terms and conditions" })}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-gray-700">
                                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>
                                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <FaCreditCard className="mr-2" />
                                            Proceed to Payment
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Reservation Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white rounded-xl shadow-md h-min sticky top-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Reservation Summary</h2>

                            {/* Car Image */}
                            <div className="mb-4">
                                <img
                                    src={bookingDetails.imageUrl}
                                    alt={bookingDetails.carName}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>

                            {/* Car Details */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg text-CharcoleDark">{bookingDetails.carName}</h3>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div>
                                        <p className="text-gray-500 text-sm">Pick-up</p>
                                        <p className="font-medium">{new Date(bookingDetails.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Return</p>
                                        <p className="font-medium">{new Date(bookingDetails.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Duration</p>
                                        <p className="font-medium">{bookingDetails.totalDays} days</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Base Rate ({bookingDetails.totalDays} days)</span>
                                    <span className="font-medium">${bookingDetails.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <span className="font-semibold">Total Price</span>
                                    <span className="text-xl font-bold text-primary">${bookingDetails.totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Additional options will be added during checkout</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CarReservationDetails;
