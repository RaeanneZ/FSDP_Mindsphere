import React from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import WorkshopSection from "../components/WorkshopSection";
import Footer from "../components/Footer";

const ProductPage = () => {
  // Dummy images for ImageCarousel
  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];

  // Detailed dummy data for pricing plans
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

  // Detailed dummy data for testimonials
  const testimonials = [
    {
      feedback:
        "I've had the privilege of witnessing Simon Yio’s public speaking on several occasions, and each time has been nothing short of impressive. Simon possesses a rare ability to communicate with clarity and precision, effortlessly distilling complex ideas into understandable concepts.",
      name: "Sharon Chong",
      title: "Attendee",
      avatar: "https://via.placeholder.com/40",
    },
    {
      feedback:
        "It was my absolute pleasure to attend a leadership training conducted by Simon Yio. His adeptness in engaging every participant truly set his training apart.",
      name: "Reza Sure Bagus",
      title: "Resilience Creative Speaker, Author, Realtor",
      avatar: "https://via.placeholder.com/40",
    },
    {
      feedback:
        "Mr. Yio’s dedication to fostering a supportive and dynamic learning environment was evident throughout the course. His ability to connect with participants and provide personalized feedback greatly enhanced the learning experience.",
      name: "Geryl Lim",
      title: "Attendee",
      avatar: "https://via.placeholder.com/40",
    },
    {
      feedback:
        "I highly recommend Simon as a trainer and am grateful for the opportunity to learn from such a seasoned professional and look forward to applying these teachings for continued success in my career.",
      name: "Lisa Seow",
      title: "Attendee",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  return (
    <>
      <Navbar />
      <ImageCarousel images={images} />
      <WorkshopSection
        pricingPlans={pricingPlans}
        testimonials={testimonials}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
