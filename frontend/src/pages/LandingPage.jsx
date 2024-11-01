import Navbar from "../components/Navbar";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/ValueBanner";
import Footer from "../components/Footer";
import ActionButtons from "../components/ActionButtons";

// NEIL BACKEND ROUTES EXAMPLE
/*

import backendService from '../utils/backendService';

// PROGSCHEDULSERVICES (also has get but is same thing as programmes)
const { progScheduleService } = backendService
const newSchedule = {
  ProgID: 2,  
  DateStart: '2024-11-15', 
  DateEnd: '2024-11-20',   
  Venue: 'Community Center', 
  TotalSeats: 30 
};

const result = await progScheduleService.addProgrammeSchedule(newSchedule);
console.log(result)

// PROGRAMMESERVICES
const { programmeService } = backendService;
const programmes = await programmeService.getAllProgrammes()
console.log(programmes)

// BOOKINGSERVICE (also has get but is same thing as programmes)
const { bookingService } = backendService;
const newBooking = {
    Email: "balls22@gmail.com",
    ProgID: 1,
    ChildID: 1,
    Diet: "Vegetarian",
    BookingDate: "2024-01-15T00:00:00.000Z"
}

const bookingResult = await bookingService.addBooking(newBooking);
console.log(bookingResult)

*/

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
