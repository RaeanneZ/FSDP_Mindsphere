import Navbar from "../components/Navbar";
import LandingBanner from "../components/LandingBanner";
import ProgrammeSection from "../components/ProgrammeSection";
import Sponsor from "../components/Sponsor";
import ValueBanner from "../components/ValueBanner";
import Footer from "../components/Footer";
import backendService from "../utils/backendService";

//here i did the test @hendrik
const { accountService } = backendService;
const account = await accountService.getAllAccounts();
console.log(account);

const accountData = {
  Name: "Hendrik yongT",
  Email: "hendrikyongT@example.com",
  ContactNo: "99990000",
  Password: "password",
  dateOfBirth: "1990-01-01",
  relationshipToChild: "Father",
  address: "123 Example St, Sample City, SC 12345",
};

const newAccount = await accountService.registerAccount(accountData);
console.log("New Account Registered:", newAccount);
//it ends here


// PAYMENT SERVICE
const { paymentService } = backendService;
const transacID = {
  TransacID: 5
}

const makePayment = await paymentService.makePayment(transacID);
console.log(makePayment)

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
    </>
  );
};

export default LandingPage;
