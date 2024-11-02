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

const AccountDashboardPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    relationship: "",
    address: "",
  });
  const [children, setChildren] = useState([1]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://your-backend-api.com/api/account"
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date[0] ? date[0].toISOString().split("T")[0] : "",
    });
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
      const response = await fetch("https://your-backend-api.com/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Account updated successfully");
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
        <AccountOverview />

        {/* Account Update Section */}
        <div className="py-20 mx-auto max-w-2xl">
          {" "}
          {/* Centered and width restricted */}
          <h2 className="text-lg font-bold mb-4">
            Update Membership Account Details
          </h2>
          <form onSubmit={handleSubmit} className="border-2 border-transparent">
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

            <h1 className="my-4 text-xl font-bold">
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
                className="text-lg font-bold flex items-center"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountDashboardPage;
