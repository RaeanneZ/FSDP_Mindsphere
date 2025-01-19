import { useEffect } from "react";

const PageTracking = ({ trackPage }) => {
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
