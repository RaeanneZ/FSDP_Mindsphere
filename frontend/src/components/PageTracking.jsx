import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTracking = () => {
  const location = useLocation();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Clear the existing timer when the route changes
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer for 2 minutes
    const newTimer = setTimeout(() => {
      console.log("2 minutes is up! Current page:", location.pathname);
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    setTimer(newTimer);

    // Cleanup the timer on unmount or route change
    return () => {
      clearTimeout(newTimer);
    };
  }, [location, timer]);

  return null; // This component doesn't render any UI
};

export default PageTracking;
