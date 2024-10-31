import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ChildAccordion = ({ number, saveChildData }) => {
  // Track status of accordion
  const [isOpen, setIsOpen] = React.useState(true);
  // For form data
  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    school: "",
    skillsets: "",
    gender: "",
  });

  React.useEffect(() => {
    // Load saved data from sessionStorage
    const savedData = JSON.parse(sessionStorage.getItem("childData")) || [];
    if (savedData[number - 1]) {
      setFormData(savedData[number - 1]);
    }

    // Initialize flatpickr for date of birth
    const datepicker = flatpickr(`#dob-${number}`, {
      dateFormat: "Y-m-d",
      defaultDate: formData.dob || "", // Set default date if available
      onChange: (selectedDates, dateStr) => {
        setFormData((prevData) => ({
          ...prevData,
          dob: dateStr, // Update only the date of birth
        }));

        // Save data to sessionStorage immediately after date change
        saveChildData(number - 1, { ...formData, dob: dateStr });
      },
    });

    // Set the datepicker value to the current state value
    datepicker.setDate(formData.dob || "", true); // Set the datepicker value

    return () => {
      datepicker.destroy(); // Cleanup flatpickr on unmount
    };
  }, [number, formData.dob]);

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
            />
            <div className="relative">
              <input
                id={`dob-${number}`}
                type="text"
                name="dob"
                placeholder="Date Of Birth"
                className="p-3 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
                value={formData.dob}
              />
            </div>

            <input
              type="text"
              name="school"
              placeholder="School"
              className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              value={formData.school}
              onChange={handleInputChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange} // Use handleInputChange for consistency
              className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <input
            type="text"
            name="skillsets"
            placeholder="Interested skillsets to develop"
            className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
            value={formData.skillsets}
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default ChildAccordion;
