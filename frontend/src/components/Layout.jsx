// This is to wrap the PageTracking component that is always present in application
import { Outlet } from "react-router-dom";
import PageTracking from "./PageTracking.jsx";

const Layout = () => {
  return (
    <>
      <PageTracking />
      <Outlet /> {/* This will render the matched child route */}
    </>
  );
};

export default Layout;
