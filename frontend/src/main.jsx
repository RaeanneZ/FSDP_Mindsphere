// Import libraries
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import all the pages
import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PersonalisationCoverPage from "./pages/PersonalisationCoverPage.jsx";
import CompleteSignupMsgPage from "./pages/CompleteSignupMsgPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import AccountDashboardPage from "./pages/AccountDashboardPage.jsx";

// Import CSS
import "../public/css/index.css";
import LoginPage from "./pages/LoginPage.jsx";
import ChildrenNamePage from "./pages/ChildrenNamePage.jsx";
import ChildrenFavPage from "./pages/ChildrenFavPage.jsx";
import ChildrenAmbition from "./pages/ChildrenAmbition.jsx";
import ChildrenInfoHeader from "./pages/ChildrenInfoHeader.jsx";
import AccountManagementPage from "./pages/AccountManagementPage.jsx";

// Import CSS
import "../public/css/index.css";
import ChildrenPageContainer from "./pages/ChildrenPageContainer.jsx";

// Fill in with all the roots of React Pages
// Parameters: Path (define the link), Element (the page itself)
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>404 Not Found</div>, // Change it to a error page component
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/personalisation",
    element: <PersonalisationCoverPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountSetup",
    element: <AccountManagementPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/childPageContainer",
    element: <ChildrenPageContainer />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountSetup/childSection",
    element: <ChildrenInfoHeader />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountSetup/childName",
    element: <ChildrenNamePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountSetup/childFav",
    element: <ChildrenFavPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountSetup/childAmbition",
    element: <ChildrenAmbition />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/welcome",
    element: <CompleteSignupMsgPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/products",
    element: <ProductPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/review",
    element: <ReviewPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/accountmanagement",
    element: <AccountDashboardPage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
