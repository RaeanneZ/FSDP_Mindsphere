import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css"; // Import Flatpickr styles
import "flatpickr/dist/themes/confetti.css"; // Import the confetti theme
import ChildAccordion from "../components/ChildAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import backendService from "../utils/backendService";

const AccountManagementPage = () => {
  // For Backend
  const { accountService } = backendService;

  // Frontend
  const navigate = useNavigate(); // Create history object
  const [errors, setErrors] = useState({}); // State for error messages
  const [children, setChildren] = useState([1]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    relationship: "",
    address: "",
  });
  const autocompleteRef = useRef(null);

  // Load Google Maps script dynamically
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLECLOUD_APIKEY
        }&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeAutocomplete(); // Initialize Autocomplete on script load
        document.body.appendChild(script);
      } else {
        initializeAutocomplete(); // Initialize if script is already loaded
      }
    };

    const initializeAutocomplete = () => {
      if (autocompleteRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteRef.current,
          { types: ["geocode"] }
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            setFormData({ ...formData, address: place.formatted_address });
          }
        });
      }
    };

    loadGoogleMapsScript();
  }, [formData]);

  const addChild = () => {
    setChildren([...children, children.length + 1]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDateChange = (date) => {
    const localDateStr = date[0]
      ? new Date(date[0].getTime() - date[0].getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : ""; // Format the date with timezone adjustment

    const updatedData = { ...formData, dob: localDateStr }; // Update only the dob field
    setFormData(updatedData); // Update the state
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";

    // Check for date of birth
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      // Check if dob is later than today
      if (dobDate > today) {
        newErrors.dob = "Date of Birth cannot be in the future.";
      }
    }

    // Check for contact number
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact Number is required.";
    } else {
      const contactNumberRegex = /^(8|9)\d{7}$/; // Regex to check for 8 or 9 followed by 7 digits
      if (!contactNumberRegex.test(formData.contactNumber)) {
        newErrors.contactNumber =
          "Contact Number must be 8 digits long and start with 8 or 9.";
      }
    }
    if (!formData.relationship)
      newErrors.relationship = "Relationship to Child is required.";
    if (!formData.address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!validateForm()) {
      return; // Prevent navigation if validation fails
    }

    // Retrieve existing parent data from session storage
    const existingParentData =
      JSON.parse(sessionStorage.getItem("parentData")) || [];

    // Append the new form data to the existing parent data
    existingParentData.push(formData);

    // Store the updated parent data in session storage
    sessionStorage.setItem("parentData", JSON.stringify(existingParentData));

    // Store children details in session storage
    const childData = JSON.parse(sessionStorage.getItem("childData")) || [];
    sessionStorage.setItem("childData", JSON.stringify(childData));

    // Method call to send parent account details to the backend (including email and password)
    try {
      // Format results to expected fields
      const accountData = {
        Name: formData.name,
        Email: existingParentData[0].email,
        ContactNo: formData.contactNumber,
        dateOfBirth: formData.dob,
        relationshipToChild: formData.relationship,
        address: formData.address,
      };

      // Method call to send parent account details to the backend
      const response = await accountService.registerAccount(accountData); // Pass the formatted accountData to the registerAccount method
      console.log("Registration:", response);

      // Navigate to the next page
      navigate("/childPageContainer");
    } catch (error) {
      console.error("Registration failed:", error);
      // You can also set an error state to display an error message to the user
      setErrors({
        ...errors,
        submit: "Registration failed. Please try again.",
      });
    }
  };

  // Function to save child data in session storage
  const saveChildData = (index, data) => {
    const currentData = JSON.parse(sessionStorage.getItem("childData")) || [];
    currentData[index] = data; // Update the specific child's data
    sessionStorage.setItem("childData", JSON.stringify(currentData)); // Save updated data
  };

  return (
    <div className="w-screen min-h-screen">
      {/* Content Starts Here */}
      <div className="py-20 mx-4 md:mx-10 lg:mx-40">
        {/* Start of Parent Input */}
        <h2 className="text-lg font-bold mb-4">Membership Account Details</h2>
        <form onSubmit={handleSubmit} className="border-2 border-transparent">
          {/* Create one container per row */}
          <div className="grid grid-cols-1 gap-4 mt-4 pb-8">
            {/* Create 2 containers in that row */}
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
                value={formData.dob} // Bind the value to formData.dob
                onChange={handleDateChange} // Handle date change
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d",
                  enableTime: false,
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

            {/* Google Maps Place Autocomplete */}
            <input
              type="text"
              name="address"
              ref={autocompleteRef}
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* End of Parent Input */}

          <h1 className="my-4 text-xl font-bold">
            Enter your child&#39;s particulars so that we can better understand
            them
          </h1>

          {/* Dynamically adding Child Accordion Form */}
          {children.map((number) => (
            <ChildAccordion
              key={number}
              number={number}
              saveChildData={saveChildData}
            />
          ))}

          {/* Add another child Button */}
          <div
            className="bg-lightBlue p-6 rounded-lg shadow-md my-4 flex items-center justify-between mb-4 cursor-pointer"
            onClick={addChild}
          >
            <span>Add Another Child</span>
            <FontAwesomeIcon icon={faPlus} />
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-lg font-bold flex items-center"
            >
              Next
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>
      {/* Content Ends Here */}
    </div>
  );
};

export default AccountManagementPage;
