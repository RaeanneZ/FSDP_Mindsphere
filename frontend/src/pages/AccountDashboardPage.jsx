import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/confetti.css";
import ChildAccordion from "../components/ChildAccordion";
import AccountOverview from "../components/AccountOverview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import backendService from "../utils/backendService";
import ConfirmationPopUp from "../components/ConfirmationPopup";

const AccountDashboardPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [accountData, setAccountData] = useState({});
  const [regCoursesData, setRegCoursesData] = useState({});
  const [consultationBookings, setConsultationBookings] = useState([]);
  const { accountService, childrenService, programmeService, meetingService } =
    backendService;
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    relationship: "",
    address: "",
  });
  const [children, setChildren] = useState([]);
  const [originalChildrenData, setOriginalChildrenData] = useState([]);
  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Effect to retrieve the email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("AccountEmail");

    if (storedEmail === null) {
      navigate("/accountEntry"); // Redirect to login page
    } else {
      setEmail(storedEmail);
      console.log("The stored email is: ", storedEmail);
    }
  }, []);

  useEffect(() => {
    if (!email) return; // Exit if email is not set

    const fetchData = async () => {
      try {
        console.log("The email is ", email);

        // Start of gettting all Account information
        const fetchedAccountData = await accountService.getAccountByEmail(
          email
        );
        setAccountData(fetchedAccountData);

        // Fetch consultation bookings
        const fetchedConsultations = await meetingService.getAllMeetings();
        console.log(fetchedConsultations);
        const userConsultations = fetchedConsultations.filter(
          (meeting) => meeting.UserEmail === email
        );
        setConsultationBookings(userConsultations);

        setFormData({
          name: fetchedAccountData.Name,
          dob: fetchedAccountData.dateOfBirth,
          contactNumber: fetchedAccountData.ContactNo,
          relationship: fetchedAccountData.relationshipToChild,
          address: fetchedAccountData.address,
        });

        setOriginalData({
          name: fetchedAccountData.Name,
          dob: fetchedAccountData.dateOfBirth,
          contactNumber: fetchedAccountData.ContactNo,
          relationship: fetchedAccountData.relationshipToChild,
          address: fetchedAccountData.address,
        }); // Store original data for comparison

        // Start of gettting all Booking information
        const fetchedBookingData =
          await programmeService.getRegisteredProgrammesByAccount(email);
        setRegCoursesData(fetchedBookingData); // Set the fetched account data to state
        console.log(regCoursesData);

        // Fetch children data
        const fetchedChildrenData = await childrenService.getChildByEmail(
          email
        );
        //setChildren(fetchedChildrenData); // Set the fetched children data to state

        // Create an array to hold original children data
        const originalChildrenArray = fetchedChildrenData.map((child) => ({
          dob: child.Dob,
          gender: child.Gender === "F" ? "Female" : "Male",
          name: child.Name,
          school: child.School,
          skillsets: child.Interests,
          specialLearningNeeds: child.Needs,
        }));

        // Store the original children data in session storage
        sessionStorage.setItem(
          "childData",
          JSON.stringify(originalChildrenArray)
        );
        setOriginalChildrenData(originalChildrenArray); // Set the state for original children data
        console.log(originalChildrenArray);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }

      try {
        const accountBookingInfo =
          await programmeService.getRegisteredProgrammesByAccount(email);
        console.log(accountBookingInfo);
        // Handle accountInfo as necessary (not shown in original code)
      } catch (error) {
        console.error("Error fetching booked courses info:", error);
      }
    };
    fetchData();
  }, [email]); // This effect runs only when email changes

  const handleChange = (e) => {
    // Defensive checks
    if (!e || !e.target) {
      console.error("Event or target is undefined");
      return;
    }

    const { name, value } = e.target;

    // Check if name is defined
    if (!name) {
      console.error("Name is undefined");
      return; // Exit if name is undefined
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setIsUpdated(
      JSON.stringify({ ...formData, [name]: value }) !==
        JSON.stringify(originalData)
    );
  };

  const handleDateChange = (date) => {
    const localDate = date[0]
      ? new Date(date[0].getTime() - date[0].getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";

    setFormData({
      ...formData,
      dob: localDate,
    });

    setIsUpdated(
      JSON.stringify({
        ...formData,
        dob: localDate,
      }) !== JSON.stringify(originalData)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact Number is required.";
    if (!formData.relationship)
      newErrors.relationship = "Relationship to Child is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Email: ", email);
      console.log("Form Data: ", formData);

      // Update Account
      const updatedFormattedData = {
        ContactNo: formData.contactNumber,
        Name: formData.name,
        address: formData.address,
        dateOfBirth: formData.dob,
        relationshipToChild: formData.relationship,
      };
      const response = await accountService.updateAccountByEmail(
        email,
        updatedFormattedData
      );

      // Update Children
      const storedChildrenData = sessionStorage.getItem("childData");
      const parsedChildrenData = JSON.parse(storedChildrenData) || [];

      const updateChildForm = async (updatedFormattedChildrenData) => {
        await childrenService.updateChild(updatedFormattedChildrenData);
      };

      // Iterate over parsed children data to update each child's information
      const childResponses = await Promise.all(
        parsedChildrenData.map(async (child) => {
          const updatedFormattedChildrenData = {
            GuardianEmail: email, // Using GuardianEmail instead of ChildID
            Name: child.name, // Using Name as an identifier along with GuardianEmail
            Gender: child.gender === "Female" ? "F" : "M",
            Dob: child.dob,
            Needs: child.specialLearningNeeds,
            School: child.school,
            Interests: child.skillsets,
          };

          console.log("Guardian Email is: ", email);
          console.log("Children: ", child);
          console.log("Name is: ", updatedFormattedChildrenData.Name);
          console.log("Gender is: ", updatedFormattedChildrenData.Gender);
          console.log("DOB is: ", updatedFormattedChildrenData.Dob);
          console.log("Needs is: ", updatedFormattedChildrenData.Needs);
          console.log("School is: ", updatedFormattedChildrenData.School);
          console.log("Interest is: ", updatedFormattedChildrenData.Interests);

          return updateChildForm(updatedFormattedChildrenData);
        })
      );

      if (response) {
        console.log("Account updated successfully. Response is ", response);
        setOriginalData(formData); // Update original data to the newly updated data
        setIsUpdated(false); // Reset the updated state
        setIsModalOpen(true); // Show the modal
      } else {
        console.error("Error updating account");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addChild = () => {
    setChildren([...children, children.length + 1]);
  };

  const saveChildData = (index, data) => {
    const currentData = JSON.parse(sessionStorage.getItem("childData")) || [];
    currentData[index] = data;
    sessionStorage.setItem("childData", JSON.stringify(currentData));
  };

  return (
    <>
      <Navbar />
      <div className="px-2 w-screen min-h-screen">
        {/* Account Overview Section */}
        <AccountOverview
          accountdata={accountData}
          bookingdata={regCoursesData}
          childrenData={originalChildrenData}
        />

        {/* Modal for Success Message */}
        <ConfirmationPopUp
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Close the modal
          message="Account successfully updated!"
          instruction=""
        />

        {/* -------------------------- Consultation Section -------------------------- */}
        <div className="bg-lightBlue py-10">
          <div className="bg-lightBlue py-10 mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Consultation Bookings</h2>
              <button
                onClick={() => navigate("/bookConsult")}
                className="bg-yellow text-white font-semibold py-2 px-6 rounded"
              >
                Book a Consultation
              </button>
            </div>

            {/* Booked Consultations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultationBookings.length === 0 ? (
                <p className="text-gray-500">
                  You have no booked consultations.
                </p>
              ) : (
                consultationBookings.map((meeting) => (
                  <div
                    key={meeting.MeetingID}
                    className="p-4 border border-gray-200 rounded-lg shadow-md bg-white"
                  >
                    <p className="pb-4 flex flex-col">
                      <strong>Meeting ID: {meeting.MeetingID}</strong>
                    </p>
                    <p>
                      <strong>Start Time:</strong>{" "}
                      {new Date(meeting.StartTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>End Time:</strong>{" "}
                      {new Date(meeting.EndTime).toLocaleString()}
                    </p>
                    <Link
                      to={`/video-call/${meeting.MeetingID}`}
                      className="text-blue-500 underline"
                    >
                      Join Room
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* -------------------------- Account Update Section -------------------------- */}
        <div className="bg-lightYellow">
          <div className="bg-lightYellow py-10 mx-auto max-w-2xl flex flex-col items-center">
            {" "}
            {/* Centered and width restricted */}
            <h2 className="text-2xl font-bold mb-5">
              Membership Account Details
            </h2>
            <form
              onSubmit={handleSubmit}
              className="border-2 border-transparent"
            >
              <div className="grid grid-cols-1 gap-4 mt-4 pb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                  <Flatpickr
                    value={formData.dob}
                    onChange={handleDateChange}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      maxDate: "today",
                    }}
                    className="p-3 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                    placeholder="Date Of Birth"
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  >
                    <option value="">Relationship to Child</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                  required
                />
              </div>

              <h1 className="my-4 text-lg font-bold">
                Enter your child&#39;s / ward&#39;s particulars so that we can
                better understand them
              </h1>
              {originalChildrenData.map((child, index) => (
                <ChildAccordion
                  key={index}
                  number={index + 1} // or any other identifier you want to use
                  saveChildData={saveChildData}
                  childData={child} // Pass the child data to the ChildAccordion
                />
              ))}
              <div
                className="bg-lightBlue p-6 rounded-lg shadow-md my-4 flex items-center justify-between mb-4 cursor-pointer"
                onClick={addChild}
              >
                <span>Add Another Child</span>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow text-white font-semibold py-3 px-6 rounded mt-4 w-full"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountDashboardPage;
