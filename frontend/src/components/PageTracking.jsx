import { useEffect, useRef } from "react";

const PageTracking = ({ trackPage, onInactivity }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        const currentPage = window.location.pathname;
        onInactivity(currentPage); // Trigger inactivity logic every 1 minute
      }, 60000); // Set to 1 minute for testing, change to 5 minutes in production
    };

    const handleActivity = () => {
      resetTimer(); // Reset the inactivity timer on user activity
    };

    // Set up activity listeners
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    // Initialize the timer
    resetTimer();

    return () => {
      // Clean up listeners and timer on unmount
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onInactivity]);

  useEffect(() => {
    const handlePageChange = () => {
      trackPage(window.location.pathname); // Track page when history changes
    };

    window.addEventListener("popstate", handlePageChange);

    return () => {
      window.removeEventListener("popstate", handlePageChange);
    };
  }, [trackPage]);

  return null;
};

export default PageTracking;
