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
        await paymentService.makePayment(
          booking.contactInfo.email,
          booking.contactInfo.name
        );
      } catch (error) {
        console.error("Payment failed", error);
      } finally {
        setLoading(false); // Hide loading popup
      }
      navigate("/");
    } else {
      console.error("Contact info is not available for payment.");
    }
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

        <button
          onClick={approvePayment}
          className="bg-yellow text-white font-semibold py-3 px-6 rounded mt-6 w-full"
        >
          Payment Complete
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
