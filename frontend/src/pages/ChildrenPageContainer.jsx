import React from "react";
import { useNavigate } from "react-router-dom";
import ChildrenNamePage from "./ChildrenNamePage";
import ChildrenFavPage from "./ChildrenFavPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ChildrenInfoHeader from "./ChildrenInfoHeader";
import ChildrenAmbition from "./ChildrenAmbition";
import { introBg } from "../utils";

const ParentChildrenPage = () => {
  const navigate = useNavigate();
  const [children, setChildren] = React.useState([]);
  const [currentChildIndex, setCurrentChildIndex] = React.useState(0); // State to track the current child index
  const [page, setPage] = React.useState("intro"); // State to track which page to show (name or favorites)

  // State for children data
  const [nickname, setNickname] = React.useState("");
  const [reasonName, setReasonName] = React.useState("");
  const [favorites, setFavorites] = React.useState({
    food: "",
    subject: "",
    color: "",
    hobby: "",
    animal: "",
  });
  const [job, setJob] = React.useState("");
  const [reasonJob, setReasonJob] = React.useState("");

  React.useEffect(() => {
    const childData = JSON.parse(sessionStorage.getItem("childData")) || [];
    if (childData.length > 0) {
      setChildren(childData);
    }
  }, []);

  const handleNext = () => {
    const updatedChildren = [...children];
    const currentChild = updatedChildren[currentChildIndex] || {};

    // Store the data in the corresponding child object
    if (page === "name") {
      currentChild.nickname = nickname;
      currentChild.reasonName = reasonName;
    } else if (page === "favorites") {
      currentChild.favorites = favorites;
    } else if (page === "ambition") {
      currentChild.job = job;
      currentChild.reasonJob = reasonJob;
    }

    // Update session storage
    updatedChildren[currentChildIndex] = currentChild;
    sessionStorage.setItem("childData", JSON.stringify(updatedChildren));

    // Change page when Next button is clicked
    if (page === "intro") {
      setPage("name");
    } else if (page === "name") {
      setPage("favorites"); // Switch to favorites page
    } else if (page === "favorites") {
      setPage("ambition");
    } else {
      if (currentChildIndex < children.length - 1) {
        setCurrentChildIndex(currentChildIndex + 1); // Move to the next child
        setPage("intro"); // Reset to intro page for the next child

        // Reset input values
        setNickname("");
        setReasonName("");
        setFavorites({
          food: "",
          subject: "",
          color: "",
          hobby: "",
          animal: "",
        });
        setJob("");
        setReasonJob("");
      } else {
        navigate("/welcome"); // Navigate to the next page when done
      }
    }
  };

  // Change page when Back button is clicked
  const handleBack = () => {
    if (page === "name") {
      setPage("intro"); // Go back to intro page
    } else if (page === "favorites") {
      setPage("name"); // Go back to intro page
    } else if (page === "ambition") {
      setPage("favorites"); // Go back to intro page
    } else {
      if (currentChildIndex > 0) {
        setCurrentChildIndex(currentChildIndex - 1); // Move to the previous child
        setPage("favorites"); // Reset to favorites page for the previous child
      }
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${introBg})` }}
    >
      <div className="w-full text-center mx-10 md:mx-20 lg:mx-40 xl:mx-80">
        {/* Determining which page to load */}
        {page === "intro" && (
          <ChildrenInfoHeader childName={children[currentChildIndex]?.name} />
        )}
        {page === "name" && (
          <ChildrenNamePage
            nickname={nickname}
            setNickname={setNickname}
            reasonName={reasonName}
            setReasonName={setReasonName}
          />
        )}
        {page === "favorites" && (
          <ChildrenFavPage favorites={favorites} setFavorites={setFavorites} />
        )}
        {page === "ambition" && (
          <ChildrenAmbition
            job={job}
            setJob={setJob}
            reasonJob={reasonJob}
            setReasonJob={setReasonJob}
          />
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className={`text-lg font-bold flex items-center ${
              currentChildIndex === 0 && page === "intro" ? "disabled" : ""
            }`}
            disabled={currentChildIndex === 0 && page === "intro"} // Disable back button on the first child
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
