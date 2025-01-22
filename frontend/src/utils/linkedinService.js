import axios from "axios";

const linkedinService = {
    // Fetch LinkedIn access token
    getAccessToken: async (code) => {
        try {
            const response = await axios.post("/api/linkedin/token", { code });
            return response.data.accessToken;
        } catch (error) {
            console.error("LinkedIn token error:", error);
            throw new Error("Failed to get access token from LinkedIn");
        }
    },

    getUserProfile: async (accessToken) => {
        try {
            const response = await axios.post("/api/linkedin/userinfo", {
                accessToken,
            });
            console.log("Response from LinkedIn userinfo:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "LinkedIn user profile error:",
                error.response?.data || error.message
            );
            throw new Error("Failed to get user profile from LinkedIn.");
        }
    },

    // Store access token and user data in the backend
    storeLinkedInData: async (data) => {
        const { sub, accessToken } = data;
        try {
            const response = await axios.post("/api/linkedin/store", {
                sub,
                accessToken,
            });
            return response.data;
        } catch (error) {
            console.error("Error storing LinkedIn data:", error);
            throw new Error("Failed to store LinkedIn data.");
        }
    },
};

export default linkedinService;
