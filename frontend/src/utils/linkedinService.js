import axios from "axios";

const backendUrl = "http://localhost:5000"; // Ensure the backend is running on this port

const linkedinService = {
    getAccessToken: async (code) => {
        if (!code) return null; // Ensure code exists

        try {
            if (sessionStorage.getItem("linkedinUsedCode") === code) {
                console.warn(
                    "⚠️ LinkedIn code has already been used. Ignoring..."
                );
                return null;
            }

            sessionStorage.setItem("linkedinUsedCode", code); // Store used code

            const response = await axios.post(
                `${backendUrl}/api/linkedin/token`,
                { code }
            );

            if (!response.data.accessToken) {
                throw new Error("No access token received.");
            }

            console.log(
                "✅ Access Token Retrieved:",
                response.data.accessToken
            );
            sessionStorage.setItem(
                "linkedinAccessToken",
                response.data.accessToken
            );
            return response.data.accessToken;
        } catch (error) {
            console.error(
                "❌ LinkedIn token error:",
                error.response?.data || error.message
            );
            return null;
        }
    },

    getUserProfile: async (accessToken) => {
        if (!accessToken) {
            console.error("❌ No access token provided.");
            return null;
        }

        try {
            console.log("🔄 Fetching LinkedIn user info...");
            const response = await axios.post(
                `${backendUrl}/api/linkedin/userinfo`,
                null,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            console.log("✅ User Profile Data:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "❌ LinkedIn user profile error:",
                error.response?.data || error.message
            );
            return null;
        }
    },

    authenticateWithBackend: async (linkedinProfile) => {
        try {
            console.log(
                "🔄 Sending LinkedIn profile to backend:",
                linkedinProfile
            );

            const response = await axios.post(`${backendUrl}/api/linkedin`, {
                linkedinId: linkedinProfile.sub, // Corrected field name
                email: linkedinProfile.email,
                firstName: linkedinProfile.given_name,
                lastName: linkedinProfile.family_name,
            });

            console.log("✅ Backend authentication response:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "❌ Backend auth error:",
                error.response?.data || error.message
            );
            return null;
        }
    },
};

export default linkedinService;
