import axios from "axios";

const linkedinService = {
    // Fetches an access token from the backend.
    // @param {string} code - Authorization code received from LinkedIn
    // @returns {string} Access token

    getAccessToken: async (code) => {
        try {
            const response = await axios.post("/api/linkedin/token", { code });
            return response.data.accessToken; // Extracts the access token
        } catch (error) {
            console.error("LinkedIn token error:", error);
            throw new Error("Failed to get access token from LinkedIn");
        }
    },

    // Fetches LinkedIn user ID using the access token.
    // @param {string} accessToken - The LinkedIn access token
    // @returns {object} LinkedIn user ID

    getUserProfile: async (accessToken) => {
        try {
            const profileResponse = await axios.get(
                "https://api.linkedin.com/v2/me",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            return {
                id: profileResponse.data.id, // Only LinkedIn user ID
            };
        } catch (error) {
            console.error("LinkedIn profile error:", error);
            throw new Error("Failed to fetch LinkedIn user profile");
        }
    },

    // Stores LinkedIn user ID and access token in the backend.
    // @param {string} linkedInId - The LinkedIn user ID
    // @param {string} accessToken - The LinkedIn access token

    storeLinkedInData: async (data) => {
        console.log("Sending LinkedIn data to backend:", data);
        try {
            const response = await axios.post("/api/linkedin/store", data);
            console.log("Response from /api/linkedin/store:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "Error posting to /api/linkedin/store:",
                error.response?.data || error.message
            );
            throw new Error("Failed to store LinkedIn data.");
        }
    },
};

export default linkedinService;
