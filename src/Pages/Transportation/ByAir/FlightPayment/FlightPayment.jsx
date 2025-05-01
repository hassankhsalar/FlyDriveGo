import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FlightPaymentForm from './FlightPaymentForm';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAY);

// Wrapper component that provides Stripe Elements context
const FlightPayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <FlightPaymentForm />
        </Elements>
    );
};

export default FlightPayment;