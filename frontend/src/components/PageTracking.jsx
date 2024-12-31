import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTracking = () => {
  const location = useLocation();
  //   const [timer, setTimer] = useState(null);

  useEffect(() => {
    console.log("Page tracker is defined!");
    // Set a new timer for 2 minutes
    const timer = setTimeout(() => {
      console.log("2 minutes is up! Current page:", location.pathname);
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    // Cleanup the timer on unmount or route change
    return () => {
      clearTimeout(timer);
    };
  }, [location]); // Only depend on the location to trigger on route changes

  return null; // This component doesn't render any UI
};

export default PageTracking;
