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
import { imageArray } from "../constants";
import backendService from "../utils/backendService";

const ReviewPage = () => {
  const { bookingService, childrenService } = backendService;
  const navigate = useNavigate();

  // Get program details from session storage
  const storedProgrammeTier = sessionStorage.getItem("selectedPlan");
  const storedSelectedProgramme = sessionStorage.getItem("selectedProgramme");
  const storedSelectedSchedule = sessionStorage.getItem("selectedSchedule");
  const tierDetails = storedProgrammeTier
    ? JSON.parse(storedProgrammeTier)
    : {};
  const programDetails = storedSelectedProgramme
    ? JSON.parse(storedSelectedProgramme)
    : {};
  const scheduleDetails = storedSelectedSchedule
    ? JSON.parse(storedSelectedSchedule)
    : {};
  console.log(tierDetails);
  console.log(programDetails);

  // Check if programDetails is valid
  const isValidProgramDetails = programDetails.Name && tierDetails.Cost;

  // State for contact info and other details
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
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected Schedule
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

  // Load booking details from session storage on component mount
  useEffect(() => {
    const savedBookingDetails = JSON.parse(
      sessionStorage.getItem("bookingDetails")
    );
    if (savedBookingDetails) {
      setContactInfo(savedBookingDetails.contactInfo);
      setDietary(savedBookingDetails.dietary);
      setSpecialRequest(savedBookingDetails.specialRequest);
      setQuantity(savedBookingDetails.quantity);
      setChildrenData(savedBookingDetails.childrenData);
      setCurrentDate(new Date(savedBookingDetails.currentDate));
    }
  }, []);

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
    console.log("Selected Event: ", selectedEvent);
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
    // Validation for contact number
    const contactNumberRegex = /^(8|9)\d{7}$/; // Regex to check for 8 or 9 followed by 7 digits
    if (!contactNumberRegex.test(contactInfo.contactNo)) {
      alert("Contact Number must be 8 digits long and start with 8 or 9.");
      return; // Exit the function if validation fails
    }

    // Validation for email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Regex to check for Gmail address
    if (!emailRegex.test(contactInfo.email)) {
      alert("Email must be a valid Gmail address.");
      return; // Exit the function if validation fails
    }

    // Get today's date in a formatted string
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    try {
      // Prepare the child data for sending to the backend
      const childrenPayload = childrenData.map((child, index) => ({
        guardianEmail: contactInfo.email,
        name: child.name,
        dob: child.dob,
        gender: child.gender,
        needs: child.specialLearningNeeds ? child.specialLearningNeeds : "None",
      }));
      console.log(contactInfo.email);

      const paymentData = {
        total: quantity * parseFloat(tierDetails.Cost),
        courseName: programDetails.Name,
        selectedPlanID: tierDetails.TierID,
        dueDate: formattedDate, // Set due date to today
      };

      await bookingService.addBooking(
        contactInfo.name,
        contactInfo.contactNo,
        contactInfo.email,
        tierDetails.TierID,
        tierDetails.ProgID,
        childrenData,
        dietary.vegetarian
          ? "Vegetarian"
          : dietary.halal
          ? "Halal"
          : dietary.other || "None",
        scheduleDetails.SchedID,
        quantity,
        specialRequest,
        paymentData.total
      );

      // Save booking details in session storage
      sessionStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          contactInfo,
          dietary,
          specialRequest,
          quantity,
          childrenData,
          currentDate: currentDate.toISOString(),
        })
      );

      // Save Payment Data
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      navigate("/payment", { state: { contactInfo } });
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

  // Find the image that matches the programDetails.ProgID
  const matchedImage = imageArray.find(
    (imageObj) => imageObj.id === programDetails.ProgID
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 max-w-2xl mx-auto sm:w-[80%]">
        <CheckoutProgress imageType="cart" />

        {/* Loop through imageArray and render CheckoutItem for each image */}
        {matchedImage && (
          <CheckoutItem
            programName={programDetails.Name}
            programTier={tierDetails.Level}
            price={parseFloat(tierDetails.Cost)}
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
          />
        )}

        {/* Render ChildPaymentForm components based on quantity */}
        <div className="childPaymentFormSection my-10 mx-0 px-0">
          {Array.from({ length: quantity }, (_, index) => (
            <ChildPaymentForm
              key={index}
              number={index + 1}
              saveChildData={handleChildDataChange} // Pass the handler to each ChildPaymentForm
            />
          ))}
        </div>

        <ContactForm
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
        />
        <DietaryRequirements dietary={dietary} setDietary={setDietary} />

        <div className="my-20">
          <h4 className="font-semibold text-lg">Select Dates</h4>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            <div className="relative w-full sm:w-auto" ref={calendarGridRef}>
              <Calendar
                value={currentDate}
                selectedProgram={programDetails}
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
