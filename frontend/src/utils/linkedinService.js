import axios from "axios";

const linkedinService = {
    getAccessToken: async (code) => {
        try {
            const response = await axios.post("/api/linkedin/token", { code });

            console.log("✅ Access Token Retrieved:", response.data); // Debugging
            return response.data.accessToken; // Make sure to return accessToken
        } catch (error) {
            console.error(
                "❌ LinkedIn token error:",
                error.response?.data || error.message
            );
            throw new Error("Failed to get access token from LinkedIn");
        }
    },

    getUserProfile: async (accessToken) => {
        if (!accessToken) {
            console.error("❌ No access token provided to getUserProfile.");
            throw new Error("Access token is required.");
        }

        try {
            console.log("🔄 Sending token to backend:", accessToken);

            const response = await axios.post("/api/linkedin/userinfo", null, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log("✅ User Profile Data:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "❌ LinkedIn user profile error:",
                error.response?.data || error.message
            );
            throw new Error("Failed to fetch LinkedIn user profile.");
        }
    },

    authenticateWithBackend: async (linkedinProfile) => {
        try {
            console.log(
                "Sending LinkedIn profile to backend:",
                linkedinProfile
            );

            const response = await axios.post("/api/auth/linkedin", {
                linkedinId: linkedinProfile.id,
                email: linkedinProfile.email,
                firstName: linkedinProfile.firstName,
                lastName: linkedinProfile.lastName,
            });

            console.log("✅ Backend authentication response:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "❌ Backend auth error:",
                error.response?.data || error.message
            );
            throw new Error("Failed to authenticate with backend");
        }
    },
};

export default linkedinService;
