import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import backendService from "../utils/backendService";
import linkedinService from "../utils/linkedinService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AccountEntry = () => {
  console.log(import.meta.env);
  const LINKEDIN_CLIENTID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const LINKEDIN_REDIRECT_URL = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

  const { accountService } = backendService;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    const signupStatus = sessionStorage.getItem("signup") == "true";
    setIsSignup(signupStatus);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await accountService.loginAccount(credentials);
      console.log(response);
      if (response?.success) {
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

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    console.log("Create Account button clicked");

    if (newsletter) {
      await newsletterService.addEmailNewsletter(email);
    }

    try {
      const response = await accountService.createAccount(email, password);

      if (response.success) {
        sessionStorage.setItem("signup", "false");
        navigate("/accountSetup");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Create Account error:", error);
      setError(
        "An error occurred while creating an account. Please try again."
      );
    }
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

  const handleLoginWithLinkedIn = async (code) => {
    try {
      const accessToken = await linkedinService.getAccessToken(code);
      console.log("Access Token Retrieved for Login:", accessToken);

      const userProfile = await linkedinService.getUserProfile(accessToken);
      console.log("User Profile Retrieved for Login:", userProfile);

      const credentials = {
        email: userProfile.email,
        password: userProfile.sub,
      }; // You might need a specific method to handle LinkedIn login passwords
      const response = await accountService.loginAccount(credentials);

      if (response?.success) {
        login();
        navigate("/");
        sessionStorage.setItem("AccountEmail", userProfile.email);
      } else {
        setError("You do not have a Linkedin Account tied with us.");
      }
    } catch (error) {
      console.error("Error in LinkedIn Login Callback:", error);
      setError("Failed to login with LinkedIn.");
    }
  };

  const handleCreateAccountWithLinkedIn = async (code) => {
    try {
      const accessToken = await linkedinService.getAccessToken(code);
      console.log("Access Token Retrieved for Signup:", accessToken);

      const userProfile = await linkedinService.getUserProfile(accessToken);
      console.log("User Profile Retrieved for Signup:", userProfile);

      const response = await accountService.createAccount(
        userProfile.email,
        userProfile.sub
      );

      if (response.success) {
        sessionStorage.setItem("signup", "false");
        sessionStorage.setItem("linkedinData", JSON.stringify(userProfile));
        navigate("/accountSetup");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error in LinkedIn Signup Callback:", error);
      setError("Failed to sign up with LinkedIn.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      // Determine whether it's a login or signup process based on `isSignup`
      if (isSignup) {
        handleCreateAccountWithLinkedIn(code);
      } else {
        handleLoginWithLinkedIn(code);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-screen flex justify-center items-center">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
          <h1 className="text-2xl font-bold text-black">
            {isSignup ? "Sign Up" : "Membership Login"}
          </h1>
          <p className="text-gray-600">Your journey is just one click away</p>
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
            {isSignup && (
              <>
                <div className="flex items-center justify-between mt-4">
                  <label className="text-gray-700">
                    Newsletter subscription
                  </label>
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
                <p className="text-sm mt-0 text-gray-500">
                  Receive the latest promotions and design releases.{" "}
                  <span className="text-red-500">No spam, promise.</span>
                </p>
              </>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>
          <div className="flex flex-col items-center mt-6">
            <p className="text-gray-600 mb-2">
              Or {isSignup ? "sign up" : "login"} with:
            </p>
            <button
              onClick={handleLinkedInLogin}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {isSignup ? "Sign up with LinkedIn" : "Login with LinkedIn"}
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4">
            {isSignup ? (
              <>
                Already a member?{" "}
                <a
                  href="/login"
                  className="text-blue-500"
                  onClick={() => sessionStorage.setItem("signup", "false")}
                >
                  Login Here
                </a>
              </>
            ) : (
              <>
                New to Mindsphere?{" "}
                <a
                  href="/signup"
                  className="text-blue-500"
                  onClick={() => sessionStorage.setItem("signup", "true")}
                >
                  Sign Up Here
                </a>
              </>
            )}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountEntry;
