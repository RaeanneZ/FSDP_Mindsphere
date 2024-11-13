import React from "react";
import Flatpickr from "react-flatpickr"; // Import Flatpickr
import "flatpickr/dist/flatpickr.css"; // Import Flatpickr styles
import "flatpickr/dist/themes/confetti.css"; // Import the confetti theme
import { prof } from "../utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConfirmationPopup from "../components/ConfirmationPopup";

const BusinessForm = () => {
  const { useState } = React;

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    businessEmail: "",
    expectedDays: "",
    groupSize: "",
    organisationName: "",
    helpMessage: "",
    callbackTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "This field is required.";
    tempErrors.contactNumber = formData.contactNumber
      ? ""
      : "This field is required.";
    tempErrors.businessEmail = formData.businessEmail
      ? ""
      : "This field is required.";
    tempErrors.expectedDays = formData.expectedDays
      ? ""
      : "This field is required.";
    tempErrors.groupSize = formData.groupSize ? "" : "This field is required.";
    tempErrors.organisationName = formData.organisationName
      ? ""
      : "This field is required.";
    tempErrors.helpMessage = formData.helpMessage
      ? ""
      : "This field is required.";
    tempErrors.callbackTime = formData.callbackTime
      ? ""
      : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      setIsModalOpen(true); // Open the modal on successful submission
    } else {
      alert("Please fill all the required fields.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Navbar />
      <div className="w-screen rounded-lg">
        <div className="lg:mx-40 flex items-center justify-center mb-8">
          <img
            alt="Group of professionals smiling and standing together"
            className="rounded-t-lg"
            src={prof}
            width="800"
          />
        </div>

        <div className="md:mx-40 bg-[#FFF6E0] flex flex-col items-center p-8 rounded-b-lg">
          <div className="text-center p-10 mb-8">
            <h1 className="text-2xl font-bold mb-4">Professionals</h1>
            <p className="mb-4">
              We recognize that every organization has unique talent development
              needs.
            </p>
            <p className="mb-4">
              To meet these diverse requirements, our programs for Professionals
              come in three customizable tiers: Lite, Comprehensive, and
              Premier.
            </p>
            <p className="mb-4">
              Each tier is carefully crafted to address your organization's
              learning goals, ensuring your team receives the most relevant and
              impactful training.
            </p>
            <p className="mb-4">
              Some professional workshops we have successfully delivered are:
            </p>
            <ul className="list-decimal list-inside text-left mx-auto max-w-md font-bold">
              <li>Train-The-Trainer Program</li>
              <li>Mastering the Art of Negotiation</li>
              <li>Time Mastery: Unlock Your Productive Potential</li>
              <li>Unlocking Emotional Intelligence</li>
              <li>Building and Leading High-Performance Teams</li>
              <li>Leadership Development Workshop</li>
            </ul>
            <p className="mt-4">
              Foster a culture of continuous learning and development within
              your organization, partner with us to drive growth and success
              within your team!
            </p>
          </div>
          <div className="bg-gray-100 w-full md:w-[70%] p-5 lg:p-20 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Enquiry Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Contact Number"
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Business Email"
                  type="email"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  required
                />
                {errors.businessEmail && (
                  <p className="text-red-500 text-xs">{errors.businessEmail}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Expected Number of Days"
                    type="text"
                    name="expectedDays"
                    value={formData.expectedDays}
                    onChange={handleChange}
                    required
                  />
                  {errors.expectedDays && (
                    <p className="text-red-500 text-xs">
                      {errors.expectedDays}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    className="p-2 border border-gray-300 rounded w-full"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Group Size</option>
                    <option value="10 - 20">10 - 30</option>
                    <option value="30 - 50">30 - 50</option>
                    <option value="Above 50">Above 50</option>
                  </select>
                  {errors.groupSize && (
                    <p className="text-red-500 text-xs">{errors.groupSize}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Organisation Name"
                  type="text"
                  name="organisationName"
                  value={formData.organisationName}
                  onChange={handleChange}
                  required
                />
                {errors.organisationName && (
                  <p className="text-red-500 text-xs">
                    {errors.organisationName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="How can we help you?"
                  name="helpMessage"
                  value={formData.helpMessage}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.helpMessage && (
                  <p className="text-red-500 text-xs">{errors.helpMessage}</p>
                )}
              </div>
              <h2 className="text-xl font-bold mb-4">Callback Request</h2>
              <div className="mb-4">
                <Flatpickr
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="When is the best time to call you?"
                  name="callbackTime"
                  value={formData.callbackTime}
                  onChange={(date) => {
                    setFormData({
                      ...formData,
                      callbackTime: date[0], // Get the first date from the array
                    });
                  }}
                  options={{
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    time_24hr: true,
                    placeholder: "Select a time",
                  }}
                  required
                />
                {errors.callbackTime && (
                  <p className="text-red-500 text-xs">{errors.callbackTime}</p>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <button
                  className="w-full px-4 py-2 my-8 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Modal for successful submission */}
            <ConfirmationPopup
              isOpen={isModalOpen}
              onClose={closeModal}
              message="Thank you for your interest!"
              instruction="We will contact you soon"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessForm;
