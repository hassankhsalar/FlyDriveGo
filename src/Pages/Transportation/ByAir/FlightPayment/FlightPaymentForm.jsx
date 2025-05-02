import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaArrowLeft, FaCreditCard, FaLock, FaPlane } from 'react-icons/fa';

const FlightPaymentForm = () => {
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
                    // Update flight booking payment status
                    await axiosSecure.patch(`/flight-bookings/${bookingId}/payment`, {
                        paymentStatus: 'paid',
                        paymentId: paymentIntent.id,
                        paymentMethod: paymentMethod.card.brand,
                        paymentTimestamp: new Date()
                    });

                    setTransactionId(paymentIntent.id);
                    toast.success("Payment successful!");

                    navigate(`/transportation/flight-booking-confirmation/${bookingId}`, {
                        state: {
                            bookingDetails: {
                                ...bookingDetails,
                                paymentId: paymentIntent.id,
                                bookingId: bookingId,
                                bookingReference: bookingReference
                            }
                        }
                    });
                } catch (err) {
                    console.error("Error updating booking payment status:", err);
                    navigate(`/transportation/flight-payment-error?bookingId=${bookingId}&reference=${bookingReference}&paymentId=${paymentIntent.id}&paymentMethod=${paymentMethod.card.brand}`);
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
            navigate('/transportation/by-air');
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
                    <span className="font-medium">Back to Passenger Details</span>
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
                            <p className="text-blue-100">Secure payment for your flight booking</p>
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
                            <h2 className="text-lg font-semibold text-CharcoleDark">Booking Summary</h2>
                            <p className="text-sm text-gray-500">Booking Reference: {bookingReference}</p>
                        </div>

                        <div className="p-6">
                            {/* Flight Details */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-CharcoleDark">{bookingDetails.flightName}</h3>
                                <p className="text-gray-600 text-sm">{bookingDetails.route}</p>
                            </div>

                            <div className="border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <FaPlane className="text-primary mr-2" />
                                        <span className="text-gray-700">Date</span>
                                    </div>
                                    <span className="font-medium">{bookingDetails.date}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-700">Time</span>
                                    </div>
                                    <span className="font-medium">{bookingDetails.time}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold text-CharcoleDark mb-2">Selected Seats</h3>
                                <div className="flex flex-wrap gap-2">
                                    {bookingDetails.selectedSeats.map((seat, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-primary rounded-md font-medium">
                                            {seat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Amount</span>
                                    <span className="text-xl font-bold text-primary">${amount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FlightPaymentForm;