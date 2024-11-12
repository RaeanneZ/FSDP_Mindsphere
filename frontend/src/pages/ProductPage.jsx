// ProductPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WorkshopSection from "../components/WorkshopSection";
import Footer from "../components/Footer";
import ProgrammeSection from "../components/ProgrammeSection";
import backendService from "../utils/backendService";
import ActionButtons from "../components/ActionButtons";
import { carouselImages } from "../constants";

const ProductPage = () => {
  const { programmeService, programmeFeedBackService } = backendService;
  const { useState, useEffect, useRef } = React;
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const [programmes, setProgrammes] = useState([]); // State to hold programmes
  const [pricingPlans, setPricingPlans] = useState([]); // State to hold pricing plans
  const [testimonials, setTestimonials] = useState([]); // State to hold testimonials
  const [selectedProgramme, setSelectedProgramme] = useState(
    location.state?.selectedProgramme || null
  ); // Get the selected programme from state

  // Create a ref for the WorkshopSection
  const workshopSectionRef = useRef(null);

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

  const getProgrammeTestimonials = async (selectedProgramme) => {
    try {
      const response = await programmeFeedBackService.getFeedbackByID(
        selectedProgramme.ProgID
      );
      setTestimonials(response.data);
      console.log(testimonials);
    } catch (err) {
      console.log("There is an error: ", err);
    }
  };

  // Scroll to WorkshopSection when the component mounts
  useEffect(() => {
    // Call the async function when the component mounts
    getAllProgrammes();
    getProgrammeTestimonials(selectedProgramme);

    if (workshopSectionRef.current) {
      workshopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedProgramme]);

  // Handle programme selection
  const handleProgrammeSelect = (selectedProgramme) => {
    setSelectedProgramme(selectedProgramme); // Set the selected programme
    getProgrammeTiers(selectedProgramme); // Fetch tiers for the selected programme
    getProgrammeTestimonials(selectedProgramme); // Fetch the testimonials for the selected programme
  };

  const handleSelectPlan = (plan) => {
    sessionStorage.setItem("selectedPlan", JSON.stringify(plan));

    navigate("/review");
  };

  return (
    <>
      <Navbar />
      <ActionButtons />
      <ProgrammeSection onProgrammeSelect={handleProgrammeSelect} />
      {selectedProgramme ? (
        <div ref={workshopSectionRef}>
          <WorkshopSection
            images={carouselImages}
            pricingPlans={pricingPlans}
            selectedProgramme={selectedProgramme}
            testimonials={testimonials}
            onSelectPlan={handleSelectPlan}
          />
        </div>
      ) : (
        <div>Loading...</div> // Or some other loading state/message
      )}
      <Footer />
    </>
  );
};

export default ProductPage;
