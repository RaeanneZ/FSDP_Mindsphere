import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ActionButtons from "../components/ActionButtons";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/ValueBanner";
import Footer from "../components/Footer";
import backendService from "../utils/backendService";

const LandingPage = () => {
  const navigate = useNavigate();

  // Handle programme selection
  const handleProgrammeSelect = (selectedProgramme) => {
    // Navigate to the ProductPage and pass the selected programme as state
    navigate("/products", { state: { selectedProgramme } });
  };

  return (
    <>
      <Navbar />
      <LandingBanner />
      <ProgrammeSection onProgrammeSelect={handleProgrammeSelect} />
      <Sponsor />
      <ValueBanner />
      <ActionButtons />
      <Footer />
      {/* <ActionButtons /> */}
    </>
  );
};

export default LandingPage;
