// ProductPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WorkshopSection from "../components/WorkshopSection";
import Footer from "../components/Footer";
import ProgrammeSection from "../components/ProgrammeSection";
import backendService from "../utils/backendService";
import ActionButtons from "../components/ActionButtons";

const ProductPage = () => {
  const { programmeService } = backendService;
  const { useState, useEffect } = React;
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const [programmes, setProgrammes] = useState([]); // State to hold programmes
  const [pricingPlans, setPricingPlans] = useState([]); // State to hold pricing plans
  const [selectedProgramme, setSelectedProgramme] = useState(
    location.state?.selectedProgramme || null
  ); // Get the selected programme from state

  // Get all programme details from backend
  const getAllProgrammes = async () => {
    try {
      const response = await programmeService.getAllProgrammes();
      setProgrammes(response);
      // If there's no selectedProgramme, set the first one as default
      if (!selectedProgramme && response.length > 0) {
        const firstProgramme = response[0];
        setSelectedProgramme(firstProgramme);
        getProgrammeTiers(firstProgramme); // Fetch pricing plans for the first programme
      } else if (selectedProgramme) {
        getProgrammeTiers(selectedProgramme); // Fetch tiers for the selected programme
      }
    } catch (error) {
      console.error("Error fetching programmes:", error);
    }
  };

  const getProgrammeTiers = async (selectedProgramme) => {
    console.log(selectedProgramme);
    try {
      const response = await programmeService.getAllProgrammeTiers();
      // Filter tiers based on the selected programmeId
      const filteredTiers = response.filter(
        (tier) => tier.ProgID === selectedProgramme.ProgID
      );
      setPricingPlans(filteredTiers);
      console.log(filteredTiers);
    } catch (error) {
      console.error("Error fetching programme tiers:", error);
    }
  };

  useEffect(() => {
    getAllProgrammes(); // Call the async function when the component mounts
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle programme selection
  const handleProgrammeSelect = (selectedProgramme) => {
    setSelectedProgramme(selectedProgramme); // Set the selected programme
    getProgrammeTiers(selectedProgramme); // Fetch tiers for the selected programme
  };

  const handleSelectPlan = (plan) => {
    sessionStorage.setItem("selectedPlan", JSON.stringify(plan));

    navigate("/review");
  };

  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];

  return (
    <>
      <Navbar />
      <ActionButtons />
      <ProgrammeSection onProgrammeSelect={handleProgrammeSelect} />
      {selectedProgramme ? (
        <WorkshopSection
          images={images}
          pricingPlans={pricingPlans}
          selectedProgramme={selectedProgramme}
          onSelectPlan={handleSelectPlan}
        />
      ) : (
        <div>Loading...</div> // Or some other loading state/message
      )}
      <Footer />
    </>
  );
};

export default ProductPage;
