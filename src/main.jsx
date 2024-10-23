// Import libraries
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import all the pages
import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PersonalisationCoverPage from "./pages/PersonalisationCoverPage.jsx";
import AudienceQuestionPage from "./pages/AudienceQuestionPage.jsx";
import InterestQuestionPage from "./pages/InterestQuestionPage.jsx";
import CompleteSignupMsgPage from "./pages/CompleteSignupMsgPage.jsx";

// Import CSS
import "../public/css/index.css";
import LoginPage from "./pages/LoginPage.jsx";

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
    path: "/personalisation/forwho",
    element: <AudienceQuestionPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/personalisation/interest",
    element: <InterestQuestionPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/welcome",
    element: <CompleteSignupMsgPage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
