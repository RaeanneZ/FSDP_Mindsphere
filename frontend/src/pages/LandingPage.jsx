import Navbar from "../components/Navbar";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/ValueBanner";
import Footer from "../components/Footer";
import ActionButtons from "../components/ActionButtons";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <ProgrammeSection />
      <Sponsor />
      <ValueBanner />
      <Footer />
      <ActionButtons />
    </>
  );
};

export default LandingPage;
