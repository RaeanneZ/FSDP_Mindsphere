import Navbar from "../components/Navbar";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/ValueBanner";
import Footer from "../components/Footer";
import axios from "axios"

//Backend connection testing
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [count, setCount] = useState(0);
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000/bookings");
    console.log(response.data);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Navbar />
      <LandingBanner />
      <ProgrammeSection />
      <Sponsor />
      <ValueBanner />
      <Footer />
    </>
  );
};

export default LandingPage;
