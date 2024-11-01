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
