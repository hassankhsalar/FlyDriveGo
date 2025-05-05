import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FlightPaymentForm from './FlightPaymentForm';

// Only show Stripe warnings in development mode, use secure connection in production
const stripePromise = loadStripe(
    import.meta.env.VITE_PAY,
    { stripeAccount: undefined }
);

// Wrapper component that provides Stripe Elements context
const FlightPayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <FlightPaymentForm />
        </Elements>
    );
};

export default FlightPayment;