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
import CorporateProgramsSection from "../components/CorporateProgramsSection";
import WatsonChat from "../components/WatsonChat";

// const { accountService } = backendService;
// const account = await accountService.signUp(
//   "test@example.com",
//   "hendrik",
//   "123456"
// );
// console.log(account);

// const { bookingService } = backendService;
// const booking = await bookingService.deleteBooking(
//   "emmawhite@example.com",
//   "2024-10-11",
//   6
// );
// console.log(booking);

// const { childrenService } = backendService;
// const email = "lucygray@example.com";
// const children = await childrenService.getChildByEmail(email);
// console.log(children);

const { programmeFeedBackService } = backendService;
const feedbackByID = await programmeFeedBackService.getFeedbackByID(1);
console.log(feedbackByID);

const LandingPage = () => {
  const navigate = useNavigate();

  // Handle programme selection
  const handleProgrammeSelect = (selectedProgramme) => {
    // Navigate to the ProductPage and pass the selected programme as state
    navigate("/products", { state: { selectedProgramme } });
  };

  return (
    <>
      <WatsonChat />
      <Navbar />
      <LandingBanner />
      <ProgrammeSection onProgrammeSelect={handleProgrammeSelect} />
      <CorporateProgramsSection />
      <Sponsor />
      <ValueBanner />
      <ActionButtons />
      <Footer />
      {/* <ActionButtons /> */}
    </>
  );
};

export default LandingPage;
