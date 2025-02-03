import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import AuthProvider for global authentication state
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PageTracking from "./components/PageTracking.jsx";
import Chatbot from "./components/Chatbot.jsx";

// Import all the pages
import LandingPage from "./pages/LandingPage.jsx";
import MemberVerificationPage from "./pages/MemberVerificationPage.jsx";
import PersonalisationCoverPage from "./pages/PersonalisationCoverPage.jsx";
import CompleteSignupMsgPage from "./pages/CompleteSignupMsgPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import AccountDashboardPage from "./pages/AccountDashboardPage.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import AccountEntry from "./pages/AccountEntry.jsx";
import ChildrenNamePage from "./pages/ChildrenNamePage.jsx";
import ChildrenFavPage from "./pages/ChildrenFavPage.jsx";
import ChildrenAmbition from "./pages/ChildrenAmbition.jsx";
import ChildrenInfoHeader from "./pages/ChildrenInfoHeader.jsx";
import AccountManagementPage from "./pages/AccountManagementPage.jsx";
import ChildrenPageContainer from "./pages/ChildrenPageContainer.jsx";
import BusinessForm from "./pages/BusinessForm.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import AdminForm from "./pages/AdminForm.jsx";
import B2BEnquiryTimelineTracker from "./pages/B2BEnquiryTimelineTracker.jsx";
// Import CSS
import "../public/css/index.css";
import AdminB2BManagement from "./pages/AdminB2BManagement.jsx";
import AdminConsultationSummaryPage from "./pages/AdminConsultationSummaryPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import VideoCall from "./components/VideoCall.jsx";
import Layout from "./components/Layout.jsx";
import EmailAdmin from "./pages/EmailAdmin.jsx";
import MediaPage from "./pages/MediaPage.jsx";
import BroadcastPage from "./pages/BroadcastPage.jsx";

// Define a function to track pages
const trackPage = (page) => {
  console.log(`Tracked page: ${page}`); // Replace with your analytics logic
};

// Define inactivity messages
const inactivityMessages = {
  "/": "Need help exploring the homepage?",
  "/login": "Having trouble logging in?",
  "/signup": "Need assistance with signing up?",
  "/personalisation": "Need help with personalising your account?",
  "/accountSetup": "Need help setting up your account?",
  "/childPageContainer": "Need help managing your children's details?",
  "/accountSetup/childSection": "Stuck on the child section setup?",
  "/accountSetup/childName": "Need help entering your child's name?",
  "/accountSetup/childFav": "Need suggestions for your child's favorites?",
  "/accountSetup/childAmbition":
    "Need guidance with entering your child's ambition?",
  "/welcome": "Excited to explore the platform? Let us guide you!",
  "/products": "Need help selecting a product?",
  "/businessEnquiry": "Have questions about submitting a business inquiry?",
  "/review": "Need help writing or submitting a review?",
  "/payment": "Need help checking out?",
  "/accountmanagement": "Need assistance managing your account?",
  "/survey": "Need help completing the survey?",
  "/about": "Want to learn more about us? Let me guide you!",
  "/admin": "Need admin-specific guidance?",
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the main component
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "products", element: <ProductPage /> },
      { path: "businessEnquiry", element: <BusinessForm /> },
      { path: "about", element: <AboutPage /> },
      { path: "media", element: <MediaPage /> },
      // Add other routes
    ],
  },
  {
    path: "/accountEntry",
    element: <AccountEntry />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <MemberVerificationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/personalisation",
    element: <PersonalisationCoverPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountSetup",
    element: <AccountManagementPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/childPageContainer",
    element: <ChildrenPageContainer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountSetup/childSection",
    element: <ChildrenInfoHeader />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountSetup/childName",
    element: <ChildrenNamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountSetup/childFav",
    element: <ChildrenFavPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountSetup/childAmbition",
    element: <ChildrenAmbition />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/welcome",
    element: <CompleteSignupMsgPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accountmanagement",
    element: <AccountDashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bookConsult",
    element: <BookingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/survey",
    element: <SurveyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email",
    element: <EmailAdmin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/broadcast-message",
    element: <BroadcastPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/timeline",
    element: <B2BEnquiryTimelineTracker />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/B2BManagement",
    element: <AdminB2BManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/consultationSummary",
    element: <AdminConsultationSummaryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/video-call/:meetingId",
    element: <VideoCall />,
    errorElement: <ErrorPage />,
  },
]);

const MainApp = () => {
  const [autoOpenMessage, setAutoOpenMessage] = useState(null);

  // Handle inactivity and set appropriate messages
  const handleInactivity = (page) => {
    const message = inactivityMessages[page];
    if (message) {
      setAutoOpenMessage(message);
    }
  };

  return (
    <StrictMode>
      <AuthProvider>
        <PageTracking trackPage={trackPage} onInactivity={handleInactivity} />
        <RouterProvider router={router} />
        {/* Chatbot is retained from AIChatbot */}
        <Chatbot trackPage={trackPage} autoOpenMessage={autoOpenMessage} />
      </AuthProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
