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

  // Get selected programme details from backend
  const getAllProgrammes = async () => {
    try {
      const response = await programmeService.getAllProgrammes(); // Adjust this line based on your actual service method
      setProgrammes(response); // Assuming response.data contains the programmes
    } catch (error) {
      console.error("Error fetching programmes:", error);
      // You might want to set an error state here to display an error message
    }
  };

  useEffect(() => {
    getAllProgrammes(); // Call the async function when the component mounts
  }, []); // Empty dependency array means this runs once when the component mounts

  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];

  const pricingPlans = [
    {
      title: "Beginner",
      price: "788",
      oldPrice: "988",
      description: "Just getting started.",
      features: [
        "Class size: 15 - 20",
        "Duration: 3.5 days",
        "Lunch provided",
        "Lesson materials provided",
        "Complimentary 1 year membership with access to our resources and member rates for all programmes",
      ],
      buttonText: "Get started",
    },
    {
      title: "Intermediate",
      price: "988",
      oldPrice: "1188",
      description: "Perfect for someone who wants more.",
      features: [
        "Class size: 12 - 15",
        "Duration: 3 days",
        "Lunch provided",
        "Lesson materials provided",
        "Complimentary 1 year membership with access to our resources and member rates for all programmes",
      ],
      buttonText: "Get started",
    },
    {
      title: "Advanced",
      price: "1388",
      description: "Experts only.",
      features: [
        "Class size: 10",
        "Duration: 3 days",
        "Lunch provided",
        "Lesson materials provided",
        "Complimentary 1 year membership with access to our resources and member rates for all programmes",
      ],
      buttonText: "Get started",
    },
  ];

  const handleSelectPlan = (plan) => {
    navigate("/review", {
      state: plan,
    });
  };

  return (
    <>
      <Navbar />
      <ProgrammeSection />
      {/* <ImageCarousel images={images} /> */}
      <WorkshopSection
        images={images}
        pricingPlans={pricingPlans}
        onSelectPlan={handleSelectPlan}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
