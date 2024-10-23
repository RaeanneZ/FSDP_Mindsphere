import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ChildAccordion = () => {
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
    const savedData = JSON.parse(sessionStorage.getItem("childData"));
    if (savedData) {
      setFormData(savedData);
    }

    flatpickr("#dob", {
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        handleInputChange({ target: { name: "dob", value: dateStr } });
      },
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      // Save data to sessionStorage
      sessionStorage.setItem("childData", JSON.stringify(newState));
      console.log(`Auto-saving data: ${name} = ${value}`);
      return newState;
    });
  };

  return (
    <div className="bg-lightBlue p-6 rounded-lg shadow-md my-4 mx-2 md:mx-10 lg:mx-40">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">Child #1</h2>

        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
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
                id="dob"
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
