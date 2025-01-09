// AccountEntry.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import backendService from "../utils/backendService";
import linkedinService from "../utils/linkedinService"; // Temporary backend
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AccountEntry = () => {
  // ENV
  console.log(import.meta.env);
  const LINKEDIN_CLIENTID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const LINKEDIN_REDIRECT_URL = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

  // For Backend
  const { accountService } = backendService;

  // Frontend
  const navigate = useNavigate(); // Create navigate object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const { login } = useAuth(); // Access the login function from context

  useEffect(() => {
    // Check sessionStorage for signup status
    const signupStatus = sessionStorage.getItem("signup") === "true";
    setIsSignup(signupStatus);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await accountService.loginAccount(credentials);
      console.log(response);
      if (response && response.success) {
        login();
        navigate("/");
        sessionStorage.setItem("AccountEmail", email);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    console.log("Create Account button clicked");
    // Add your Create Account functionality here
  };

  const handleLinkedInLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: LINKEDIN_CLIENTID,
      redirect_uri: LINKEDIN_REDIRECT_URL,
      scope: "openid profile email",
    });

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      handleLinkedInCallback(code);
    }
  }, []);

  const handleLinkedInCallback = async (code) => {
    try {
      const accessToken = await linkedinService.getAccessToken(code);
      const userData = await linkedinService.getUserData(accessToken);
      console.log("LinkedIn User Data:", userData);
      sessionStorage.setItem("AccountEmail", userData.email);
      navigate("/");
    } catch (error) {
      console.error("LinkedIn login error:", error);
      setError("Failed to log in with LinkedIn.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen flex justify-center items-center">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
          <h1 className="text-2xl font-bold text-black">
            {isSignup ? "Create Your Account" : "Membership Login"}
          </h1>
          <p className="text-gray-600">
            {isSignup
              ? "Join us and start your journey today."
              : "Your journey is just one click away."}
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <form
            onSubmit={isSignup ? handleCreateAccount : handleLogin}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="flex flex-col items-center mt-6">
            <p className="text-gray-600 mb-2">Or login with:</p>
            <button
              onClick={handleLinkedInLogin}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login with LinkedIn
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountEntry;
