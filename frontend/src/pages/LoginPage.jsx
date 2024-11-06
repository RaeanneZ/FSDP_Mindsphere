import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  // For Backend
  const { accountService } = backendService;

  // Frontend
  const navigate = useNavigate(); // Create navigate object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object for the credentials
    const credentials = {
      email,
      password,
    };
    console.log(email);
    console.log(password);

    try {
      // Call the loginAccount method with the credentials
      const response = await accountService.loginAccount(credentials);

      // Check if the login was successful
      console.log("The response is: ", response);
      if (response && response.success) {
        // Assuming the response has a success property
        // Redirect to home page
        navigate("/"); // Navigate to the next page
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex justify-center items-center">
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
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
