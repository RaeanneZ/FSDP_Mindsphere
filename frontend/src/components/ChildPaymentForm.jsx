import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css"; // Import Flatpickr styles
import "flatpickr/dist/themes/confetti.css"; // Import the confetti theme

const ChildPaymentForm = ({ number, saveChildData }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    school: "",
    needs: "",
    gender: "",
  });

  const dobInputRef = React.useRef(null); // Ref for the date input

  React.useEffect(() => {
    // Load saved data on mount
    const savedData = JSON.parse(sessionStorage.getItem("childData")) || [];
    if (savedData[number - 1]) {
      setFormData(savedData[number - 1]);
    }
  }, [number]);

  const handleDateChange = (date) => {
    if (date[0]) {
      // Adjust for local timezone
      const localDate = new Date(
        date[0].getTime() - date[0].getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const updatedData = { ...formData, dob: localDate }; // Update only the dob field
      setFormData(updatedData); // Update the state
      saveChildData(updatedData); // Save to session storage
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Save data to sessionStorage
    saveChildData(number - 1, updatedData);
  };

  return (
    <div className="bg-lightBlue p-6 rounded-lg shadow-md my-2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">Child #{number}</h2>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <div className="relative">
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
                required
              />
            </div>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="text"
              name="school"
              placeholder="School"
              className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              value={formData.school}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="needs"
            placeholder="Special Learning Needs"
            className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
            value={formData.needs}
            onChange={handleInputChange}
            required
          />
        </div>
      )}
    </div>
  );
};

export default ChildPaymentForm;
