import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const { user } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      receipt_email: user?.email,
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setError('');
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your payment was completed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      // Map cart to purchased product structure
      const purchasedProducts = cart.map(item => ({
        title: item.name,
        image: item.image,
        quantity: item.quantity || 1,
        price: item.price,
        productId: item._id,
      }));

      // Send to server to save purchased products
      axiosSecure.post('/purchased-products', {
        email: user?.email,
        products: purchasedProducts
      })
        .then(res => {
          if (res.data.insertedCount > 0 || res.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              text: 'Your order has been pladced successfully.',
              timer: 2000,
              showConfirmButton: false,
            });

            // Clear the cart after saving the purchase
            axiosSecure.delete('/clear-cart', { data: { email: user?.email } })
              .then(response => {
                if (response.data.success) {
                  refetch(); // refresh or clear cart in frontend
                }
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Failed to clear the cart.',
                });
              });
              navigate('/eshop');
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to save product data to server.',
          });
        });
    }
  };

  return (
    <div>
      <h3 className="font-red-rose text-xl md:text-2xl mb-10">Total Price: {totalPrice}</h3>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
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
