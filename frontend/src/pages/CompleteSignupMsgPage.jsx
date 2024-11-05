import React from "react";
import { introBg } from "../utils";
import backendService from "../utils/backendService"; // Import backend service

const CompleteSignupMsgPage = () => {
  const { childrenService } = backendService;
  const { useEffect } = React;
  useEffect(() => {
    const addChildrenToBackend = async () => {
      try {
        // Retrieve child and parent data from session storage
        const childData = JSON.parse(sessionStorage.getItem("childData"));
        const parentData =
          JSON.parse(sessionStorage.getItem("parentData")) || [];

        // Check if childData is valid and an array
        if (Array.isArray(childData) && childData.length > 0) {
          for (const child of childData) {
            let shortformGender = "M";

            if (child.gender == "Female") {
              shortformGender = "F";
            }

            // Ensure child is in the correct format before sending
            const childPayload = {
              name: child.name,
              dob: child.dob,
              gender: shortformGender,
              school: child.school,
              needs: child.specialLearningNeeds,
              interests: child.interests,
              guardianEmail: parentData.email,
            };

            // Send each child data to the backend
            await childrenService.addChild(childPayload);
          }
          console.log(
            "All child data has been successfully added to the backend."
          );
        } else {
          console.warn("No valid child data found in session storage.");
        }
      } catch (err) {
        console.error("Error adding child data to backend: ", err);
      }
    };

    addChildrenToBackend(); // Call the function to add children to the backend
  }, [childrenService]); // Add childrenService as a dependency

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${introBg})` }}
    >
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow mb-4">
          Welcome Onboard!
        </h1>
        <p className="text-2xl md:text-4xl text-black mb-8">
          We hope to see you soon in our workshops and seminars
        </p>
        <a href="/">
          <button className="bg-yellow text-white px-6 py-3 rounded-full text-lg font-semibold">
            Go To Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default CompleteSignupMsgPage;
