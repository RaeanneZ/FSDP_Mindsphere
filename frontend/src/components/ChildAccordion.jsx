import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faGroupArrowsRotate,
  faMinus,
  faPlus,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";

const ChildAccordion = ({ number, saveChildData }) => {
  // Track status of accordion
  const [isOpen, setIsOpen] = React.useState(true);
  // For form data
  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    school: "",
    skillsets: "",
  });

  React.useEffect(() => {
    // Load saved data from sessionStorage
    const savedData = JSON.parse(sessionStorage.getItem("childData")) || [];
    // if (savedData) {
    //   setFormData(savedData);
    // }
    if (savedData[number - 1]) {
      setFormData(savedData[number - 1]);
    }

    flatpickr(`#dob-${number}`, {
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        handleInputChange({ target: { name: "dob", value: dateStr } });
      },
    });
  }, [number]);

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
        <div>
          <label className="mr-8">
            <input type="radio" name="gender" className="mr-1" /> Boy
          </label>
          <label>
            <input type="radio" name="gender" className="mr-1" /> Girl
          </label>
        </div>

        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
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
                onChange={handleInputChange}
              />
            </div>
          </div>
          <input
            type="text"
            name="school"
            placeholder="School"
            className="p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
            value={formData.school}
            onChange={handleInputChange}
          />
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
