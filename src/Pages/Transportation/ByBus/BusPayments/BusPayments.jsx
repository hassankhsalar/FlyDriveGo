import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';

// Only show Stripe warnings in development mode, use secure connection in production
const stripePromise = loadStripe(
    import.meta.env.VITE_PAY,
    { stripeAccount: undefined }
);

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    // Extract bus booking details from location state
    const bookingId = location.state?.bookingId;
    const bookingReference = location.state?.bookingReference;
    const totalPrice = location.state?.amount || 0;
    const bookingDetails = location.state?.bookingDetails;

    useEffect(() => {
        // Create payment intent when component loads
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error creating payment intent:', err);
                    setError('Failed to initialize payment. Please try again.');
                });
        }
    }, [totalPrice, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setProcessing(true);
        setError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment error:', error);
            setError(error.message);
            setProcessing(false);
            return;
        }

        // Confirm card payment
        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: bookingDetails?.contactInfo?.name || 'Customer',
                            email: bookingDetails?.contactInfo?.email || 'customer@example.com',
                        },
                    },
                }
            );

            if (confirmError) {
                setError(confirmError.message);
            } else if (paymentIntent.status === "succeeded") {
                try {
                    // Update bus booking payment status
                    await axiosSecure.patch(`/bus-bookings/${bookingId}/payment`, {
                        paymentStatus: 'paid',
                        paymentId: paymentIntent.id,
                        paymentMethod: paymentMethod.card.brand,
                        paymentTimestamp: new Date()
                    });

                    toast.success("Payment successful!");

                    // Navigate to booking confirmation with query params instead of state
                    // This creates a shareable/bookmarkable URL
                    navigate(`/transportation/booking-confirmation?reference=${bookingReference}`);
                } catch (err) {
                    console.error("Error updating booking payment status:", err);

                    // Navigate to error handler with query params
                    navigate(`/transportation/payment-error?bookingId=${bookingId}&reference=${bookingReference}&paymentId=${paymentIntent.id}`);
                }
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError("An unexpected error occurred during payment processing.");
        }

        setProcessing(false);
    };

    return (
        <div>
            <h3 className="font-red-rose text-xl md:text-2xl mb-10">Bus Booking Payment: ${totalPrice}</h3>
            {bookingId && bookingReference && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Booking Reference: {bookingReference}</h4>
                    <p className="text-sm text-gray-600">Complete your payment to confirm your bus reservation.</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn w-full bg-primary text-white my-4"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? "Processing..." : "Pay Now"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};

const BusPayments = () => {
    return (
        <div className="mx-5 md:mx-20 my-5 md:my-20">
            <div className="max-w-[750px] mx-auto my-8 md:my-12">
                <div>
                    <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose text-primary font-bold mb-5 md:mb-10">
                        Complete Your Bus Booking
                    </h2>
                </div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default BusPayments;