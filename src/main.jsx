import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import "../public/css/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
} from "react-router-dom";

// Fill in with all the roots of React Pages
// Parameters: Path (define the link), Element (the page itself)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>, // Change it to a error page component
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
