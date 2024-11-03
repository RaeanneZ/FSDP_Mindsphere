// ProductPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import WorkshopSection from "../components/WorkshopSection";
import Footer from "../components/Footer";
import ProgrammeSection from "../components/ProgrammeSection";
import backendService from "../utils/backendService";

const ProductPage = () => {
  const { programmeService } = backendService;
  const { useState, useEffect } = React;
  const navigate = useNavigate();
  const [programmes, setProgrammes] = useState([]); // State to hold programmes
  const [pricingPlans, setPricingPlans] = useState([]); // State to hold pricing plans
  const [selectedProgramme, setSelectedProgramme] = useState(null); // State to hold the selected programme

  // Get all programme details from backend
  const getAllProgrammes = async () => {
    try {
      const response = await programmeService.getAllProgrammes();
      setProgrammes(response);
      // Set the first programme as the selected programme if available
      if (response.length > 0) {
        const firstProgramme = response[0];
        setSelectedProgramme(firstProgramme);
        getProgrammeTiers(firstProgramme); // Fetch pricing plans for the first programme
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
    navigate("/review", {
      state: {
        title: selectedProgramme?.Name, // Assuming selectedProgramme has a Name property
        price: plan.Cost,
        tier: plan.Level,
      },
    });
  };

  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];

  return (
    <>
      <Navbar />
      <ProgrammeSection onProgrammeSelect={handleProgrammeSelect} />
      {/* <ImageCarousel images={images} /> */}
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
