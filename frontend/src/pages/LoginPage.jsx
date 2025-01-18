// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkedinService from "../utils/linkedinService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
    const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const LINKEDIN_REDIRECT_URL = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email and password login not yet implemented.");
    };

    const handleLinkedInLogin = () => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: LINKEDIN_CLIENT_ID,
            redirect_uri: LINKEDIN_REDIRECT_URL,
            scope: "openid profile email",
        });

        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
    };

    const handleLinkedInCallback = async (code) => {
        console.log("Inside handleLinkedInCallback with code:", code);
        try {
            const accessToken = await linkedinService.getAccessToken(code);
            console.log("Access Token Retrieved:", accessToken);

            // Save token in session storage or local storage
            sessionStorage.setItem("LinkedInAccessToken", accessToken);

            // Optionally retrieve the user profile to display or process further
            const userProfile = await linkedinService.getUserProfile(
                accessToken
            );
            console.log("User Profile Retrieved:", userProfile);

            // Redirect to home or dashboard after login
            navigate("/");
        } catch (error) {
            console.error("Error in LinkedIn Callback:", error);
            setError("Failed to log in with LinkedIn.");
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            handleLinkedInCallback(code);
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="w-screen flex justify-center items-center">
                <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
                    <h1 className="text-2xl font-bold text-black">
                        Membership Login
                    </h1>
                    <p className="text-gray-600">
                        Your journey is just one click away
                    </p>
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

export default LoginPage;

//OLD CODE

// LoginPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import backendService from "../utils/backendService";
// import linkedinService from "../utils/linkedinService"; // Temporary backend
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { LinkedIn } from "react-linkedin-login-oauth2";

// const LoginPage = () => {
//   // ENV
//   console.log(import.meta.env);
//   const LINKEDIN_CLIENTID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
//   const LINKEDIN_REDIRECT_URL = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

//   // For Backend
//   const { accountService } = backendService;

//   // Frontend
//   const navigate = useNavigate(); // Create navigate object
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const { login } = useAuth(); // Access the login function from context

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Create an object for the credentials
//     const credentials = {
//       email,
//       password,
//     };

//     try {
//       // Call the loginAccount method with the credentials
//       const response = await accountService.loginAccount(credentials);
//       console.log(response);
//       // Check if the login was successful
//       if (response && response.success) {
//         login(); // Set loggedIn to true in the context
//         navigate("/"); // Redirect to home page
//         sessionStorage.setItem("AccountEmail", email);
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("An error occurred while logging in. Please try again.");
//     }
//   };

//   const handleLinkedInLogin = () => {
//     const params = new URLSearchParams({
//       response_type: "code",
//       client_id: LINKEDIN_CLIENTID,
//       redirect_uri: LINKEDIN_REDIRECT_URL,
//       scope: "openid profile email",
//     });

//     window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
//   };

//   React.useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (code) {
//       handleLinkedInCallback(code);
//     }
//   }, []);

//   const handleLinkedInCallback = async (code) => {
//     try {
//       const accessToken = await linkedinService.getAccessToken(code);

//       const userData = await linkedinService.getUserData(accessToken);
//       console.log("LinkedIn User Data:", userData);

//       // Optionally, log in the user or store session data
//       sessionStorage.setItem("AccountEmail", userData.email);
//       navigate("/"); // Redirect to homepage
//     } catch (error) {
//       console.error("LinkedIn login error:", error);
//       setError("Failed to log in with LinkedIn.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="w-screen flex justify-center items-center">
//         <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
//           <h1 className="text-2xl font-bold text-black">Membership Login</h1>
//           <p className="text-gray-600">Your journey is just one click away</p>
//           {error && <p className="text-red-500">{error}</p>}
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full px-4 py-2 mt-4 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
//             >
//               Login
//             </button>

//             <p className="text-center text-gray-600">
//               New to Mindsphere?{" "}
//               <a href="/signup" className="text-blue-500">
//                 Sign Up Here
//               </a>
//             </p>
//           </form>

//           {/* Linkedin Login */}
//           <div className="flex flex-col items-center mt-6">
//             <p className="text-gray-600 mb-2">Or login with:</p>
//             <button
//               onClick={handleLinkedInLogin}
//               className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//             >
//               Login with LinkedIn
//             </button>
//             {/* End of Linkedin Login */}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LoginPage;
