import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('payment error', error);
      setError(error.message)
    }
    else {
      console.log('payment method', paymentMethod);
      setError('')
    }
  };

  return (
    <div>
      <h3 className="font-red-rose  text-xl md:text-2xl mb-10">Total Price: {totalPrice}</h3>
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
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
