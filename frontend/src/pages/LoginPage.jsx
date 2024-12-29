// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LinkedIn } from "react-linkedin-login-oauth2";

const LoginPage = () => {
  // ENV
  const LINKEDIN_CLIENTID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  // For Backend
  const { accountService } = backendService;

  // Frontend
  const navigate = useNavigate(); // Create navigate object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Access the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object for the credentials
    const credentials = {
      email,
      password,
    };

    try {
      // Call the loginAccount method with the credentials
      const response = await accountService.loginAccount(credentials);
      console.log(response);
      // Check if the login was successful
      if (response && response.success) {
        login(); // Set loggedIn to true in the context
        navigate("/"); // Redirect to home page
        sessionStorage.setItem("AccountEmail", email);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  // For linkedin
  const handleLinkedInSuccess = async (code) => {
    try {
      const accessToken = await linkedinService.getAccessToken(code);
      const userData = await linkedinService.getUserData(accessToken);
      console.log("LinkedIn User Data:", userData);
    } catch (error) {
      console.error("LinkedIn Login Error:", error);
      setError("Failed to login with LinkedIn. Please try again.");
    }
  };

  const handleLinkedInFailure = (error) => {
    console.error("LinkedIn Login Failed:", error);
    setError("LinkedIn login failed. Please try again.");
  };

  return (
    <>
      <Navbar />
      <div className="w-screen flex justify-center items-center">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
          <h1 className="text-2xl font-bold text-black">Membership Login</h1>
          <p className="text-gray-600">Your journey is just one click away</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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
              Login
            </button>

            <p className="text-center text-gray-600">
              New to Mindsphere?{" "}
              <a href="/signup" className="text-blue-500">
                Sign Up Here
              </a>
            </p>
          </form>

          {/* Linkedin Login */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-gray-600 mb-2">Or login with:</p>
            <LinkedIn
              clientId={LINKEDIN_CLIENTID}
              onFailure={handleLinkedInFailure}
              onSuccess={(code) => handleLinkedInSuccess(code)}
              redirectUri="http://localhost:3000/linkedin"
            >
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Login with LinkedIn
              </button>
            </LinkedIn>
            {/* End of Linkedin Login */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
