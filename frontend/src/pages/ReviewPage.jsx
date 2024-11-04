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
import backendService from "../utils/backendService";

const ReviewPage = () => {
  const { bookingService, childrenService } = backendService;
  const navigate = useNavigate();

  // Get program details from session storage
  const storedProgrammeTier = sessionStorage.getItem("selectedPlan");
  const storedSelectedProgramme = sessionStorage.getItem("selectedProgramme");
  const tierDetails = storedProgrammeTier
    ? JSON.parse(storedProgrammeTier)
    : {};
  const programDetails = storedSelectedProgramme
    ? JSON.parse(storedSelectedProgramme)
    : {};

  console.log(tierDetails);
  console.log(programDetails);

  // Check if programDetails is valid
  const isValidProgramDetails = programDetails.Name && tierDetails.Cost;

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
  const [selectedEvent, setSelectedEvent] = useState(null); // Booking
  const [childrenData, setChildrenData] = useState(
    Array.from({ length: quantity }, () => ({
      name: "",
      dob: "",
      school: "",
      specialLearningNeeds: "",
      gender: "",
    }))
  );

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

  const handleChildDataChange = (index, childData) => {
    const updatedChildrenData = [...childrenData];
    updatedChildrenData[index] = childData;
    setChildrenData(updatedChildrenData);
    console.log("Updated Children Data:", updatedChildrenData); // Debugging line
  };

  const handleProceedToPayment = async () => {
    // Get today's date in a formatted string
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const paymentData = {
      total: quantity * parseFloat(programDetails.price),
      courseName: programDetails.title,
      dueDate: formattedDate, // Set due date to today
    };

    try {
      // Prepare the child data for sending to the backend
      const childrenPayload = childrenData.map((child, index) => ({
        guardianEmail: contactInfo.email,
        name: child.name,
        dob: child.dob,
        gender: child.gender,
        needs: child.specialLearningNeeds ? child.specialLearningNeeds : "None",
      }));
      console.log("Children Data: ", childrenPayload);

      // Send child data to backend
      for (const child of childrenPayload) {
        console.log("Indiv child is: ", child);
        await childrenService.addChild(child);

        const newBooking = {
          Email: contactInfo.email,
          Tier: programDetails.tier, // Contains the tier
          Child: [{ name: child.name }, { dob: child.dob }],
          Diet: dietary.vegetarian
            ? "Vegetarian"
            : dietary.halal
            ? "Halal"
            : dietary.other || "None",
          BookingDate: "2024-01-15T00:00:00.000Z", // To be updated once the calendar logic is inside
        };

        await bookingService.addBooking(newBooking);
      }
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      navigate("/payment");
    } catch (error) {
      console.error("Error processing payment: ", error);
      // Handle error (e.g., show error message)
    }
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
          programName={programDetails.Name}
          programTier={tierDetails.Level}
          price={parseFloat(tierDetails.Cost)}
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
            saveChildData={handleChildDataChange} // Pass the handler to each ChildPaymentForm
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
