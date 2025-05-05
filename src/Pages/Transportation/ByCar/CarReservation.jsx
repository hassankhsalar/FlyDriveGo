import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCar, FaCalendarAlt, FaIdCard, FaUser, FaPhone, FaEnvelope, FaCreditCard } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const CarReservation = () => {
    const { carId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [additionalOptions, setAdditionalOptions] = useState({
        insurance: false,
        gps: false,
        childSeat: false,
        additionalDriver: false
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            contactInfo: {
                name: '',
                email: '',
                phone: ''
            },
            driverInfo: {
                name: '',
                licenseNumber: '',
                age: ''
            }
        }
    });

    // Initialize booking details from location state or fetch if needed
    useEffect(() => {
        // Check if user is authenticated
        if (!user) {
            toast.error("Please login to continue with your car reservation");
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        if (location.state?.bookingDetails) {
            setBookingDetails(location.state.bookingDetails);
            setTotalPrice(location.state.bookingDetails.totalPrice);
        } else {
            // No booking details in state, redirect back to car details
            toast.error("Please select rental dates before proceeding");
            navigate(`/transportation/car-details/${carId}`);
        }

        // Pre-fill contact form with user data if available
        if (user) {
            setValue('contactInfo.name', user.displayName || '');
            setValue('contactInfo.email', user.email || '');
            setValue('driverInfo.name', user.displayName || '');
        }
    }, [location, navigate, carId, setValue, user]);

    // Update total price when additional options change
    useEffect(() => {
        if (!bookingDetails) return;

        let newTotal = bookingDetails.totalPrice;

        // Add costs for additional options
        if (additionalOptions.insurance) newTotal += 15 * bookingDetails.totalDays;
        if (additionalOptions.gps) newTotal += 5 * bookingDetails.totalDays;
        if (additionalOptions.childSeat) newTotal += 8 * bookingDetails.totalDays;
        if (additionalOptions.additionalDriver) newTotal += 10 * bookingDetails.totalDays;

        setTotalPrice(newTotal);
    }, [additionalOptions, bookingDetails]);

    const handleOptionChange = (option) => {
        setAdditionalOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const onSubmit = async (data) => {
        if (!bookingDetails) return;

        setIsSubmitting(true);

        try {
            // Create booking in the backend API
            const bookingData = {
                carId: bookingDetails.carId,
                carName: bookingDetails.carName,
                startDate: bookingDetails.startDate,
                endDate: bookingDetails.endDate,
                totalDays: bookingDetails.totalDays,
                basePrice: bookingDetails.totalPrice,
                contactInfo: data.contactInfo,
                driverInfo: data.driverInfo,
                additionalOptions,
                totalPrice,
                imageUrl: bookingDetails.imageUrl
            };

            const response = await axiosPublic.post('/car-bookings', bookingData);

            toast.success("Car reservation confirmed successfully!");

            // Navigate to payment page with booking reference
            navigate('/transportation/payment', {
                state: {
                    bookingId: response.data.bookingId,
                    bookingReference: response.data.bookingReference,
                    amount: totalPrice,
                    bookingType: 'car',
                    bookingDetails: {
                        ...bookingDetails,
                        contactInfo: data.contactInfo,
                        driverInfo: data.driverInfo,
                        additionalOptions
                    }
                }
            });
        } catch (error) {
            console.error("Error creating car booking:", error);
            toast.error("There was an error processing your reservation. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (!bookingDetails) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading reservation details...</p>
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
                    to={`/transportation/car-details/${carId}`}
                    className="group inline-flex items-center text-primary hover:text-primary-dark transition-all bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
                >
                    <motion.div
                        className="mr-2"
                        whileHover={{ x: -3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaArrowLeft />
                    </motion.div>
                    <span className="font-medium">Back to Car Details</span>
                </Link>
            </motion.div>

            {/* Page title */}
            <motion.h1
                className="text-3xl font-bold text-CharcoleDark mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Complete Your Car Reservation
            </motion.h1>

            {/* Main content - Two columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Forms */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <motion.div
                            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                    <FaUser className="mr-2 text-primary" />
                                    Contact Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <FaUser />
                                            </span>
                                            <input
                                                type="text"
                                                {...register('contactInfo.name', { required: 'Name is required' })}
                                                className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        {errors.contactInfo?.name && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <FaEnvelope />
                                            </span>
                                            <input
                                                type="email"
                                                {...register('contactInfo.email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="johndoe@example.com"
                                            />
                                        </div>
                                        {errors.contactInfo?.email && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <FaPhone />
                                            </span>
                                            <input
                                                type="tel"
                                                {...register('contactInfo.phone', { required: 'Phone number is required' })}
                                                className={`w-full pl-10 pr-3 py-2 border ${errors.contactInfo?.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="+1 (123) 456-7890"
                                            />
                                        </div>
                                        {errors.contactInfo?.phone && <p className="text-red-500 text-xs mt-1">{errors.contactInfo.phone.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                    <FaIdCard className="mr-2 text-primary" />
                                    Driver Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Driver's Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <FaUser />
                                            </span>
                                            <input
                                                type="text"
                                                {...register('driverInfo.name', { required: 'Driver name is required' })}
                                                className={`w-full pl-10 pr-3 py-2 border ${errors.driverInfo?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        {errors.driverInfo?.name && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Age</label>
                                        <input
                                            type="number"
                                            min="18"
                                            max="99"
                                            {...register('driverInfo.age', {
                                                required: 'Age is required',
                                                min: {
                                                    value: 21,
                                                    message: 'Driver must be at least 21 years old'
                                                }
                                            })}
                                            className={`w-full px-3 py-2 border ${errors.driverInfo?.age ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="25"
                                        />
                                        {errors.driverInfo?.age && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.age.message}</p>}
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">License Number</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <FaIdCard />
                                            </span>
                                            <input
                                                type="text"
                                                {...register('driverInfo.licenseNumber', { required: 'License number is required' })}
                                                className={`w-full pl-10 pr-3 py-2 border ${errors.driverInfo?.licenseNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="DL123456789"
                                            />
                                        </div>
                                        {errors.driverInfo?.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.driverInfo.licenseNumber.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-CharcoleDark mb-4 flex items-center">
                                    <FaCar className="mr-2 text-primary" />
                                    Additional Options
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="insurance"
                                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            checked={additionalOptions.insurance}
                                            onChange={() => handleOptionChange('insurance')}
                                        />
                                        <div className="ml-3">
                                            <label htmlFor="insurance" className="text-gray-700 font-medium">Full Insurance</label>
                                            <p className="text-gray-500 text-xs">$15/day</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="gps"
                                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            checked={additionalOptions.gps}
                                            onChange={() => handleOptionChange('gps')}
                                        />
                                        <div className="ml-3">
                                            <label htmlFor="gps" className="text-gray-700 font-medium">GPS Navigation</label>
                                            <p className="text-gray-500 text-xs">$5/day</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="childSeat"
                                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            checked={additionalOptions.childSeat}
                                            onChange={() => handleOptionChange('childSeat')}
                                        />
                                        <div className="ml-3">
                                            <label htmlFor="childSeat" className="text-gray-700 font-medium">Child Seat</label>
                                            <p className="text-gray-500 text-xs">$8/day</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="additionalDriver"
                                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            checked={additionalOptions.additionalDriver}
                                            onChange={() => handleOptionChange('additionalDriver')}
                                        />
                                        <div className="ml-3">
                                            <label htmlFor="additionalDriver" className="text-gray-700 font-medium">Additional Driver</label>
                                            <p className="text-gray-500 text-xs">$10/day</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                        required
                                    />
                                    <span className="ml-2 text-gray-700 text-sm">
                                        I agree to the Terms & Conditions and Privacy Policy
                                    </span>
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right column - Booking Summary */}
                <div>
                    <motion.div
                        className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-CharcoleDark mb-4">Reservation Summary</h2>

                            <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={bookingDetails.imageUrl}
                                    alt={bookingDetails.carName}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3">
                                    <h3 className="text-white font-semibold">{bookingDetails.carName}</h3>
                                </div>
                            </div>

                            <div className="border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-primary mr-2" />
                                        <span className="text-gray-700">Pick-up</span>
                                    </div>
                                    <span className="font-medium">{bookingDetails.startDate}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-primary mr-2" />
                                        <span className="text-gray-700">Return</span>
                                    </div>
                                    <span className="font-medium">{bookingDetails.endDate}</span>
                                </div>
                            </div>

                            <div className="border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Base Rate ({bookingDetails.totalDays} {bookingDetails.totalDays === 1 ? 'day' : 'days'})</span>
                                    <span className="font-medium">${bookingDetails.totalPrice.toFixed(2)}</span>
                                </div>

                                {additionalOptions.insurance && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Full Insurance</span>
                                        <span>${(15 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                {additionalOptions.gps && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">GPS Navigation</span>
                                        <span>${(5 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                {additionalOptions.childSeat && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Child Seat</span>
                                        <span>${(8 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                {additionalOptions.additionalDriver && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Additional Driver</span>
                                        <span>${(10 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total Price</span>
                                <span className="text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CarReservation;
