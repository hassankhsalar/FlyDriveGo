import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAY);

const Payment = () => {
  return (
    <div className="mx-5 md:mx-20 my-5 md:my-20">
      <div className="max-w-[750px] mx-auto my-8 md:my-12">
        <div>
          <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose text-primary font-bold mb-5 md:mb-10">
            Card Info
          </h2>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
