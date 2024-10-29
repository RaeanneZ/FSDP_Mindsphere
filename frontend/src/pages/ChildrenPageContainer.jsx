import React from "react";
import { useNavigate } from "react-router-dom";
import ChildrenNamePage from "./ChildrenNamePage";
import ChildrenFavPage from "./ChildrenFavPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ChildrenInfoHeader from "./ChildrenInfoHeader";
import ChildrenAmbition from "./ChildrenAmbition";

const ParentChildrenPage = () => {
  const navigate = useNavigate();
  const [children, setChildren] = React.useState([]);
  const [currentChildIndex, setCurrentChildIndex] = React.useState(0); // State to track the current child index
  const [page, setPage] = React.useState("intro"); // State to track which page to show (name or favorites)

  React.useEffect(() => {
    const childData = JSON.parse(sessionStorage.getItem("childData"));
    if (childData) {
      setChildren(childData);
    }
  }, []);

  const handleNext = () => {
    if (page === "intro") {
      setPage("name");
    } else if (page === "name") {
      setPage("favorites"); // Switch to favorites page
    } else if (page === "favorites") {
      setPage("ambition");
    } else {
      if (currentChildIndex < children.length - 1) {
        setCurrentChildIndex(currentChildIndex + 1); // Move to the next child
        setPage("name"); // Reset to name page for the next child
      } else {
        navigate("/welcome"); // Navigate to the next page when done
      }
    }
  };

  const handleBack = () => {
    if (page === "name") {
      setPage("intro"); // Go back to intro page
    } else if (page === "favorites") {
      setPage("name"); // Go back to intro page
    } else if (page === "ambition") {
      setPage("ambition"); // Go back to intro page
    } else {
      if (currentChildIndex > 0) {
        setCurrentChildIndex(currentChildIndex - 1); // Move to the previous child
        setPage("favorites"); // Reset to favorites page for the previous child
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center py-20">
      <div className="text-center mx-10 md:mx-20 lg:mx-40 xl:mx-80">
        <h1 className="text-2xl font-bold mb-4">
          Child {currentChildIndex + 1} Details
        </h1>

        {/* Determining which page to load */}
        {page === "intro" && (
          <ChildrenInfoHeader name={children[currentChildIndex].name} />
        )}
        {page === "name" && <ChildrenNamePage />}
        {page === "favorites" && <ChildrenFavPage />}
        {page === "ambition" && <ChildrenAmbition />}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="text-lg font-bold flex items-center"
            disabled={currentChildIndex === 0 && page === "name"} // Disable back button on the first child
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-lg font-bold flex items-center"
          >
            {page === "intro" ||
            page === "name" ||
            page === "favorites" ||
            page === "ambition"
              ? "Next"
              : "Done"}
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentChildrenPage;
