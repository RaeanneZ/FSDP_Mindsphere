import React, { useEffect, useState } from "react";
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

const AccountDashboardPage = () => {
  const [accountData, setAccountData] = useState({});
  const [regCoursesData, setRegCoursesData] = useState({});
  const { accountService } = backendService;
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    relationship: "",
    address: "",
  });
  const [children, setChildren] = useState([1]);
  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  const email = "user@example.com"; // Replace with the actual email of the logged-in user

  useEffect(() => {
    const email = sessionStorage.getItem("AccountEmail");
    const fetchData = async () => {
      try {
        // Start of gettting all Account information
        const fetchedAccountData = await accountService.getAccountByEmail(
          email
        );
        setAccountData(fetchedAccountData);

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
        const fetchedBookingData = await accountService.retrieveAccountInfo(
          email
        );
        setRegCoursesData(fetchedBookingData); // Set the fetched account data to state
      } catch (error) {
        console.error("Error fetching account data:", error);
      }

      try {
        const accountBookingInfo = await accountService.retrieveAccountInfo(
          email
        );
        console.log(accountBookingInfo);
        // Handle accountInfo as necessary (not shown in original code)
      } catch (error) {
        console.error("Error fetching booked courses info:", error);
      }
    };
    fetchData();
  }, [email]);

  const handleChange = (e) => {
    // Defensive checks
    if (!e || !e.target) {
      console.error("Event or target is undefined");
      return;
    }

    const { name, value } = e.target;

    // Debugging: Log the event and the name and value
    console.log("Event:", e);
    console.log("Name:", name);
    console.log("Value:", value);

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
    setFormData({
      ...formData,
      dob: date[0] ? date[0].toISOString().split("T")[0] : "",
    });
    setIsUpdated(
      JSON.stringify({
        ...formData,
        dob: date[0] ? date[0].toISOString().split("T")[0] : "",
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
      const response = await accountService.updateAccountByEmail(
        email,
        formData
      );
      if (response) {
        console.log("Account updated successfully");
        setOriginalData(formData); // Update original data to the newly updated data
        setIsUpdated(false); // Reset the updated state
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
      <div className="w-screen min-h-screen">
        {/* Account Overview Section */}
        <AccountOverview
          accountdata={accountData}
          bookingdata={regCoursesData}
        />

        {/* Account Update Section */}
        <div className="bg-[#FFF6E0]">
          <div className="bg-[#FFF6E0] py-10 mx-auto max-w-2xl flex flex-col items-center">
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
              {children.map((number) => (
                <ChildAccordion
                  key={number}
                  number={number}
                  saveChildData={saveChildData}
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
                  disabled={!isUpdated}
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
