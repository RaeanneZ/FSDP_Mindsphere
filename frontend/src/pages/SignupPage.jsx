import React from "react";
import { useNavigate } from "react-router-dom";
import backendService from "../utils/backendService";

const SignupPage = () => {
  // For Backend
  const { accountService, newsletterService } = backendService;

  // Frontend
  const { useState } = React;
  const navigate = useNavigate(); // Create navigate object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug statements
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Verification Code:", verificationCode);
    console.log("Newsletter Subscription:", newsletter);

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
      password,
      newsletter,
    };
    parentDataArray.push(parentData);

    // Store the updated parent data in session storage
    sessionStorage.setItem("parentData", JSON.stringify(parentDataArray));

    const response = await accountService.signUp(
      email,
      password,
      verificationCode
    );

    if (!response.success) {
      setError(
        "Verification failed. Please check your email and verification code."
      );
      return;
    } else {
      // Add email if newsletter = true
      if (newsletter) {
        await newsletterService.addEmailNewletter(email);
      }
      // Navigate to the next page
      navigate("/personalisation"); // Navigate to the next page
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
          Enter your email and password to create your brand new membership
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
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex items-center justify-between mt-4">
            <label className="text-gray-700">Newsletter subscription</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Receive the latest promotions and design releases.{" "}
            <span className="text-red-500">No spam, promise.</span>
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 my-8 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
          >
            Create Account
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

export default SignupPage;
