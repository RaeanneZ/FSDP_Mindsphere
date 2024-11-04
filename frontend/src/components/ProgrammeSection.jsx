import React from "react";
import backendService from "../utils/backendService";

const ProgrammeSection = ({ onProgrammeSelect }) => {
  const { useState, useEffect } = React;
  const { programmeService } = backendService;
  const [selectedProgrammeIndex, setSelectedProgrammeIndex] = useState(null);
  const [programmes, setProgrammes] = useState([]); // State to hold programmes
  const [loading, setLoading] = useState(true); // State to handle loading

  const handleProgrammeClick = (index) => {
    setSelectedProgrammeIndex(index);

    const selectedProgramme = programmes[index];
    // Save the selected programme to session storage
    sessionStorage.setItem(
      "selectedProgramme",
      JSON.stringify(selectedProgramme)
    );

    // Pass the selected programme's ID to the parent component
    onProgrammeSelect(selectedProgramme); // Assuming each programme has a unique `id`
  };

  // Get all programmes from backend
  const getAllProgrammes = async () => {
    try {
      const response = await programmeService.getAllProgrammes();
      setProgrammes(response);
    } catch (error) {
      console.error("Error fetching programmes:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getAllProgrammes(); // Call the async function when the component mounts
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our Signature Programmes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programmes.map((programme, index) => (
          <div
            key={programme.progID}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ${
              selectedProgrammeIndex === index ? "border-4 border-yellow" : ""
            }`}
            onClick={() => handleProgrammeClick(index)}
          >
            <img
              src={programme.image}
              alt={programme.Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {programme.Name}
              </h2>
              <p className="text-gray-600">{programme.ProgDesc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammeSection;
