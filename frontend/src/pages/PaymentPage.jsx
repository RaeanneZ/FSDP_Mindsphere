// PaymentPage.jsx
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
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe.js

const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your Stripe publishable key

const PaymentPage = () => {
  const { paymentService } = backendService;
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const storedBookingDetails = sessionStorage.getItem("bookingDetails");
  const booking = storedBookingDetails ? JSON.parse(storedBookingDetails) : {};

  console.log(booking.contactInfo.email);
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("paymentData"));
    if (data) {
      setPaymentData(data);
    }
  }, []);

  console.log("Booking email to send: ", booking.contactInfo.email);
  const approvePayment = async () => {
    if (booking.contactInfo.email) {
      setLoading(true); // Show loading popup
      try {
        // Backend ------------------------------------------------------------------------
        await paymentService.makePayment(
          booking.contactInfo.email,
          booking.contactInfo.name
        );

        // Stripe Payment -----------------------------------------------------------------
        const stripe = await stripePromise;

        // Get the client secret from your backend
        const { clientSecret } = await paymentService.clientSecret({
          amount: paymentData.total,
          currency: "sgd", // Or your desired currency
        });

        // Confirm the payment with Stripe.js
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement("card"),
            billing_details: {
              name: booking.contactInfo.name,
              email: booking.contactInfo.email,
            },
          },
        });

        if (result.error) {
          console.error("Payment failed:", result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          // Payment succeeded
          navigate("/survey", {
            state: {
              title: "We can't wait to see you there!",
              message:
                "Meanwhile, please provide us your feedback. It will help us to improve.",
            },
          });
        }
        // Stripe Payment -----------------------------------------------------------------

        // Navigate to SurveyPage with success message
        // navigate("/survey", {
        //   state: {
        //     title: "We can't wait to see you there!",
        //     message:
        //       "Meanwhile, please provide us your feedback. It will help us to improve.",
        //   },
        // });
      } catch (error) {
        console.error("Payment failed", error);
      } finally {
        setLoading(false); // Hide loading popup
      }
    } else {
      console.error("Contact info is not available for payment.");
    }
  };

  const cancelPayment = () => {
    // Delete the booking object
    navigate("/survey", {
      state: {
        title: "We are sad to see you go!",
        message: "Please provide us your feedback so that we can improve!",
      },
    });
  };

  if (!paymentData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {loading && <LoadingPopup />} {/* Show loading popup when loading */}
      <main className="flex-grow p-4 sm:p-6 mx-auto w-full max-w-lg lg:max-w-[800px]">
        <CheckoutProgress imageType="payment" />

        <PaymentSummary
          total={`$${paymentData.total}`}
          courseName={paymentData.courseName}
        />
        <PaymentDueDate dueDate={paymentData.dueDate} />

        <div className="mt-6">
          <PayNowSection />
        </div>

        {/* Button Container for Side by Side Layout */}
        <div className="flex justify-between mt-6">
          <button
            onClick={cancelPayment}
            className="bg-gray-400 text-white font-semibold py-3 px-6 rounded w-full mr-2"
          >
            Cancel Payment
          </button>
          <button
            onClick={approvePayment}
            className="bg-yellow text-white font-semibold py-3 px-6 rounded w-full ml-2"
          >
            Payment Complete
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
