import { useEffect, useState } from "react";

const PageTracking = ({ trackPage, onInactivity }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const handleActivity = () => {
      if (timer) clearTimeout(timer);

      setTimer(
        setTimeout(() => {
          const currentPage = window.location.pathname;
          onInactivity(currentPage); // Trigger inactivity logic
        }, 60000) // Set to 1 minute for testing, change to 5 minutes in production
      );
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    handleActivity(); // Reset timer when component loads

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
      if (timer) clearTimeout(timer);
    };
  }, [timer, onInactivity]);

  useEffect(() => {
    const handlePageChange = () => {
      trackPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePageChange);

    return () => {
      window.removeEventListener("popstate", handlePageChange);
    };
  }, [trackPage]);

  return null;
};

export default PageTracking;
