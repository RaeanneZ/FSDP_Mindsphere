import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ActionButtons from "../components/ActionButtons";
import Footer from "../components/Footer";
import WatsonChat from "../components/WatsonChat";
import OurStory from "../components/OurStory";
import LearningApproach from "../components/LearningApproach";
import AboutSection from "../components/AboutSection";
import AboutReview from "../components/AboutReview";

const AboutPage = () => {
  return (
    <>
      <WatsonChat />
      <Navbar />
      <OurStory />
      <LearningApproach />
      <AboutSection />
      <AboutReview />
      <ActionButtons />
      <Footer />
    </>
  );
};

export default AboutPage;
