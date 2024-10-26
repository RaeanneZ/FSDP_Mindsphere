import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import ChildAccordion from "../components/ChildAccordion";
import { childSurveyBg1, parentSurveyBg } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";

const AccountManagementPage = () => {
  const navigate = useNavigate(); // Create history object

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleNext = () => {
    // You can also check if formData is valid before navigating
    navigate("/childrenSection"); // Navigate to the next page
  };

  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${childSurveyBg1})` }}
    >
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
              />

              <input
                type="text"
                name="dob"
                placeholder="Date Of Birth"
                value={formData.dob}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              />
              <i className="fas fa-calendar-alt absolute right-3 top-3"></i>

              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              />

              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
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
            />
          </div>
        </form>
        {/* End of Parent Input */}

        <h1 className="my-4 text-xl font-bold">
          Enter your child&#39;s particulars so that we can better understand
          them
        </h1>

        {/* Dynamically adding Child Accordion Form */}
        {children.map((number) => (
          <ChildAccordion key={number} number={number} />
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
          <button type="submit" className="text-lg font-bold flex items-center">
            <a href="/childrenSection">
              Next
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </a>
          </button>
        </div>
      </div>
      {/* Content Ends Here */}
    </div>
  );
};

export default AccountManagementPage;
