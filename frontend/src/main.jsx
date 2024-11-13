// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import AuthProvider for global authentication state
import { AuthProvider } from "./contexts/AuthContext.jsx";

// Import all the pages
import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PersonalisationCoverPage from "./pages/PersonalisationCoverPage.jsx";
import CompleteSignupMsgPage from "./pages/CompleteSignupMsgPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import AccountDashboardPage from "./pages/AccountDashboardPage.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ChildrenNamePage from "./pages/ChildrenNamePage.jsx";
import ChildrenFavPage from "./pages/ChildrenFavPage.jsx";
import ChildrenAmbition from "./pages/ChildrenAmbition.jsx";
import ChildrenInfoHeader from "./pages/ChildrenInfoHeader.jsx";
import AccountManagementPage from "./pages/AccountManagementPage.jsx";
import ChildrenPageContainer from "./pages/ChildrenPageContainer.jsx";
import BusinessForm from "./pages/BusinessForm.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";

// Import CSS
import "../public/css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
    path: "/products",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/businessEnquiry",
    element: <BusinessForm />,
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
    path: "/survey",
    element: <SurveyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
