// ReviewPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";
import ContactForm from "../components/ContactForm";
import DietaryRequirements from "../components/DietaryRequirements";
import SpecialRequest from "../components/SpecialRequest";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import EventDetail from "../components/EventDetail";
import ChildPaymentForm from "../components/ChildPaymentForm";

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const programDetails = location.state || {}; // Fallback to an empty object if state is undefined

  // Check if programDetails is valid
  const isValidProgramDetails = programDetails.title && programDetails.price;

  const [contactInfo, setContactInfo] = useState({
    name: "",
    contactNo: "",
    email: "",
  });
  const [dietary, setDietary] = useState({
    halal: false,
    vegetarian: false,
    other: "",
  });
  const [specialRequest, setSpecialRequest] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarGridRef = useRef(null);
  const [calendarDimensions, setCalendarDimensions] = useState({
    height: "auto",
    width: "auto",
  });

  useEffect(() => {
    const updateCalendarDimensions = () => {
      if (calendarGridRef.current) {
        setCalendarDimensions({
          height: calendarGridRef.current.offsetHeight,
          width: calendarGridRef.current.offsetWidth,
        });
      }
    };

    updateCalendarDimensions();
    window.addEventListener("resize", updateCalendarDimensions);

    return () => window.removeEventListener("resize", updateCalendarDimensions);
  }, [currentDate, selectedEvent]);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProceedToPayment = () => {
    // Get today's date in a formatted string
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const paymentData = {
      total: quantity * parseFloat(programDetails.price),
      courseName: programDetails.title,
      dueDate: formattedDate, // Set due date to today
    };
    sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment");
  };

  // If program details are not valid, render an error message
  if (!isValidProgramDetails) {
    return (
      <div>
        <h2>Error: No program details found.</h2>
        <button onClick={() => navigate("/products")}>
          Go back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6 max-w-2xl mx-auto sm:w-[80%]">
        <CheckoutProgress imageType="cart" />

        <CheckoutItem
          programName={programDetails.title}
          price={parseFloat(programDetails.price)}
          quantity={quantity}
          onIncrease={() => setQuantity(quantity + 1)}
          onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
        />
        <ContactForm
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
        />
        <DietaryRequirements dietary={dietary} setDietary={setDietary} />

        {/* Render ChildPaymentForm components based on quantity */}
        {Array.from({ length: quantity }, (_, index) => (
          <ChildPaymentForm
            key={index}
            number={index + 1}
            saveChildData={() => {}}
          />
        ))}

        <div className="my-20">
          <h4 className="font-semibold text-lg">Select Dates</h4>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            <div className="relative w-full sm:w-auto" ref={calendarGridRef}>
              <Calendar
                value={currentDate}
                onChange={setCurrentDate}
                onSelectEvent={setSelectedEvent}
              />
            </div>

            <div
              className={`overflow-auto bg-lightBlue rounded-lg p-4 sm:mt-0 sm:self-start ${
                selectedEvent ? "" : "hidden"
              }`}
              style={{
                height: calendarDimensions.height,
                width: calendarDimensions.width,
              }}
            >
              <EventDetail event={selectedEvent} />
            </div>
          </div>
        </div>

        <SpecialRequest
          specialRequest={specialRequest}
          setSpecialRequest={setSpecialRequest}
        />
        <button
          className="bg-yellow text-white font-semibold py-3 px-6 rounded mt-4 w-full"
          onClick={handleProceedToPayment}
        >
          Pay with PayNow
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewPage;
