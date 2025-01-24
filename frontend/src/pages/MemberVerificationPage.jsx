import React from "react";
import { useNavigate } from "react-router-dom";
import backendService from "../utils/backendService";

const MemberVerificationPage = () => {
  // For Backend
  const { accountService, newsletterService } = backendService;

  // Frontend
  const { useState } = React;
  const navigate = useNavigate(); // Create navigate object
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug statements
    console.log("Email:", email);
    console.log("Verification Code:", verificationCode);

    // Validate email
    if (!isGmail(email)) {
      setError("Please enter a valid Gmail account.");
      return;
    }

    // Retrieve existing parent data from session storage
    const existingParentData = JSON.parse(sessionStorage.getItem("parentData"));

    // Check if existingParentData is an array; if not, initialize it as an empty array
    const parentDataArray = Array.isArray(existingParentData)
      ? existingParentData
      : [];

    // Create and store the parentData
    const parentData = {
      email,
    };
    parentDataArray.push(parentData);

    // Store the updated parent data in session storage
    sessionStorage.setItem("parentData", JSON.stringify(parentDataArray));

    // VerifyEmail with backend
    const response = await accountService.verifyEmail(email, verificationCode);
    console.log("response is: ", response);
    if (!response.success) {
      setError(
        "Verification failed. Please check your email and verification code."
      );
      return;
    } else {
      // Navigate to the next page
      sessionStorage.setItem("signup", "true");
      navigate("/signup");
    }
  };

  const isGmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-bold text-black">
          Enter your email and the verification code sent to your inbox to join
          the family
        </h1>
        <p className="text-gray-600">Almost done! We hate paperwork, too</p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
              <p className="text-center text-gray-600 mb-2">
                Enter <span className="text-yellow">complementary</span>{" "}
                membership code
              </p>
              <input
                type="text"
                placeholder="Verification Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 my-8 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
          >
            Verify Email
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default MemberVerificationPage;
