import Navbar from "../components/Navbar";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/valueBanner";
import Footer from "../components/Footer";

const LandingPage = () => {
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
