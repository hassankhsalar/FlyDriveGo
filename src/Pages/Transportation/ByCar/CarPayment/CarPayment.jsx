import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaArrowLeft, FaCreditCard, FaLock } from 'react-icons/fa';

const CarPayment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const { bookingId, bookingReference, amount, bookingDetails } = location.state || {};

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [cardError, setCardError] = useState('');

    useEffect(() => {
        if (amount > 0) {
            axiosSecure.post('/create-payment-intent', { price: amount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                    toast.error('Failed to initialize payment. Please try again.');
                });
        }
    }, [amount, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        setProcessing(true);

        try {
            // Create payment method
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (paymentMethodError) {
                setCardError(paymentMethodError.message);
                setProcessing(false);
                return;
            }

            // Confirm payment
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: bookingDetails?.contactInfo?.name || 'Anonymous',
                        email: bookingDetails?.contactInfo?.email || 'anonymous@example.com'
                    }
                }
            });

            if (confirmError) {
                setCardError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                try {
                    // Update car booking payment status
                    await axiosSecure.patch(`/car-bookings/${bookingId}/payment`, {
                        paymentStatus: 'paid',
                        paymentId: paymentIntent.id,
                        paymentMethod: paymentMethod.card.brand,
                        paymentTimestamp: new Date()
                    });

                    setTransactionId(paymentIntent.id);
                    toast.success("Payment successful!");

                    navigate(`/transportation/car-booking-confirmation?reference=${bookingReference}`);
                } catch (err) {
                    console.error("Error updating booking payment status:", err);

                    navigate(`/transportation/payment-error?bookingId=${bookingId}&reference=${bookingReference}&paymentId=${paymentIntent.id}`);
                }
            }
        } catch (error) {
            console.error("Payment processing error:", error);
            toast.error("An unexpected error occurred during payment processing");
        } finally {
            setProcessing(false);
        }
    };

    // Redirect if no booking data
    useEffect(() => {
        if (!bookingId || !amount) {
            toast.error("Missing booking information");
            navigate('/transportation/by-car');
        }
    }, [bookingId, amount, navigate]);

    if (!bookingDetails) {
        return (
            <div className="min-h-[70vh] flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4">
            {/* Back button */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    <span className="font-medium">Back to Reservation Details</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Form */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-primary text-white p-6">
                            <h1 className="text-2xl font-bold">Complete Your Payment</h1>
                            <p className="text-blue-100">Secure payment for your car rental</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Security Notice */}
                            <div className="mb-6 flex items-start bg-blue-50 p-4 rounded-lg">
                                <FaLock className="text-blue-500 mt-1 mr-3" />
                                <p className="text-sm text-blue-700">
                                    Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                                </p>
                            </div>

                            {/* Card Element */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Information
                                </label>
                                <div className="p-4 border border-gray-300 rounded-lg">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Card Error */}
                            {cardError && (
                                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                                    {cardError}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="text-center mt-6">
                                <button
                                    type="submit"
                                    disabled={!stripe || !clientSecret || processing}
                                    className={`bg-primary text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center mx-auto
                                        ${(!stripe || !clientSecret || processing) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark transition-colors'}`}
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaCreditCard className="mr-2" />
                                            Pay ${amount.toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-min sticky top-8">
                        <div className="bg-gray-50 p-4">
                            <h2 className="text-lg font-semibold text-CharcoleDark">Order Summary</h2>
                            <p className="text-sm text-gray-500">Booking Reference: {bookingReference}</p>
                        </div>

                        <div className="p-6">
                            {/* Car Details */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={bookingDetails.imageUrl}
                                    alt={bookingDetails.carName}
                                    className="w-20 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold">{bookingDetails.carName}</h3>
                                    <p className="text-sm text-gray-600">{bookingDetails.totalDays} days rental</p>
                                </div>
                            </div>

                            {/* Rental Dates */}
                            <div className="border-t border-b py-4 my-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Pick-up Date</span>
                                    <span>{new Date(bookingDetails.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Return Date</span>
                                    <span>{new Date(bookingDetails.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Base Rental ({bookingDetails.totalDays} days)</span>
                                    <span>${bookingDetails.basePrice?.toFixed(2) || bookingDetails.totalPrice.toFixed(2)}</span>
                                </div>

                                {bookingDetails.additionalOptions?.insurance && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Insurance</span>
                                        <span>${(15 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                {bookingDetails.additionalOptions?.gps && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">GPS Navigation</span>
                                        <span>${(5 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                {bookingDetails.additionalOptions?.childSeat && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Child Safety Seat</span>
                                        <span>${(8 * bookingDetails.totalDays).toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total Amount</span>
                                        <span className="text-xl font-bold text-primary">${amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CarPayment;
