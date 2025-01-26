import React, { useState } from "react";
import ConsultationBookingForm from "../components/ConsultationBookingForm";
import ConsultationCalendar from "../components/ConsultationCalendar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Book a Consultation</h1>
        <ConsultationCalendar onSlotSelect={handleSlotSelect} />
        {selectedSlot && (
          <ConsultationBookingForm selectedSlot={selectedSlot} />
        )}
      </div>
      <Footer />
    </>
  );
};
export default BookingPage;
