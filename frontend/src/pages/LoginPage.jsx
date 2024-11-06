// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Access the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValidUser = await mockApiCall(email, password);

    if (isValidUser) {
      login(); // Set loggedIn to true in the context
      navigate("/"); // Redirect to home page
    } else {
      setError("Invalid email or password");
    }
  };

  const mockApiCall = async (email, password) => {
    const mockData = {
      email: "user@example.com",
      password: "password123",
    };
    return email === mockData.email && password === mockData.password;
  };

  return (
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
  );
};

export default LoginPage;
