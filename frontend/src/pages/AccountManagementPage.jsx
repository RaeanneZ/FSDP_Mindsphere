import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChildAccordion from "../components/ChildAccordion";
import { childSurveyBg1, parentSurveyBg } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";

const AccountManagementPage = () => {
  const navigate = useNavigate(); // Create history object
  const [errors, setErrors] = React.useState({}); // State for error messages
  const [children, setChildren] = React.useState([1]);
  const addChild = () => {
    setChildren([...children, children.length + 1]);
  };

  // This is for parent form
  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    contactNumber: "",
    relationship: "",
    address: "",
  });

  React.useEffect(() => {
    flatpickr("#parentDob", {
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        handleChange({ target: { name: "dob", value: dateStr } });
      },
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!validateForm()) {
      return; // Prevent navigation if validation fails
    }

    // Store children details in session storage
    const childData = JSON.parse(sessionStorage.getItem("childData")) || [];
    sessionStorage.setItem("childData", JSON.stringify(childData));

    // Send parent account details to the backend
    // try {
    //   const response = await fetch("https://your-backend-api.com/api/account", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    navigate("/childPageContainer"); // Navigate to the next page
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
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                required
              />

              <input
                id="parentDob"
                type="text"
                name="dob"
                placeholder="Date Of Birth"
                value={formData.dob}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                required
              />
              <i className="fas fa-calendar-alt absolute right-3 top-3"></i>

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
