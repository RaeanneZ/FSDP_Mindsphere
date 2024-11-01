// PaymentPage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import PaymentSummary from "../components/PaymentSummary";
import PaymentDueDate from "../components/PaymentDueDate";
import PayNowSection from "../components/PaynowSection";

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("paymentData"));
    if (data) {
      setPaymentData(data);
    }
  }, []);

  if (!paymentData) {
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
          <PayNowSection />
        </div>

        <button className="bg-[#DCAF27] text-white font-semibold py-3 px-6 rounded mt-6 w-full">
          Payment Complete
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
