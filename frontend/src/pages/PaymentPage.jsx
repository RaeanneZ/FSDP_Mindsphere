import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import PaymentSummary from "../components/PaymentSummary";
import PaymentDueDate from "../components/PaymentDueDate";
import PayNowSection from "../components/PaynowSection";
import LoadingPopup from "../components/LoadingPopup";
import backendService from "../utils/backendService";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Replace with your Stripe publishable key

const PaymentForm = ({ clientSecret, booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setLoading(true);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: booking.contactInfo.email,
          payment_method_data: {
            billing_details: {
              name: booking.contactInfo.name,
              email: booking.contactInfo.email,
            },
          },
          return_url: window.location.origin, // Optional redirect after payment
        },
      });

      if (error) {
        console.error("Payment failed:", error.message);
        alert(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Payment succeeded
        navigate("/survey", {
          state: {
            title: "We can't wait to see you there!",
            message:
              "Meanwhile, please provide us your feedback. It will help us to improve.",
          },
        });
      } else {
        console.error("Payment did not succeed:", paymentIntent);
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className={`bg-yellow text-white font-semibold py-3 px-6 rounded w-full mt-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Payment Complete"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const { paymentService } = backendService;

  const navigate = useNavigate();

  const storedBookingDetails = sessionStorage.getItem("bookingDetails");
  const booking = storedBookingDetails ? JSON.parse(storedBookingDetails) : {};

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { clientSecret } = await paymentService.clientSecret();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
        alert("Failed to initialize payment. Please try again.");
        navigate("/"); // Redirect to a safe page if initialization fails
      }
    };

    fetchClientSecret();

    const data = JSON.parse(sessionStorage.getItem("paymentData"));
    if (data) {
      setPaymentData(data);
    }
  }, [navigate]);

  const cancelPayment = () => {
    navigate("/survey", {
      state: {
        title: "We are sad to see you go!",
        message: "Please provide us your feedback so that we can improve!",
      },
    });
  };

  if (!clientSecret || !paymentData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 mx-auto w-full max-w-lg lg:max-w-[800px]">
        <CheckoutProgress imageType="payment" />
        <PaymentSummary
          total={`$${paymentData.total}`}
          courseName={paymentData.courseName}
        />
        <PaymentDueDate dueDate={paymentData.dueDate} />
        <div className="mt-6">
          {/* <PayNowSection /> */}
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} booking={booking} />
          </Elements>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={cancelPayment}
            className="bg-gray-400 text-white font-semibold py-3 px-6 rounded w-full mr-2"
          >
            Cancel Payment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
