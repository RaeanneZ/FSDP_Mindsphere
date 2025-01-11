import axios from "axios";

const linkedinService = {
    getAccessToken: async (code) => {
        try {
            const response = await axios.post("/api/linkedin/token", { code });
            return response.data.access_token;
        } catch (error) {
            console.error("LinkedIn token error:", error);
            throw new Error("Failed to get access token from LinkedIn");
        }
    },

    getUserProfile: async (accessToken) => {
        try {
            // Get basic profile
            const profileResponse = await axios.get(
                "https://api.linkedin.com/v2/me",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            // Get email address
            const emailResponse = await axios.get(
                "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            return {
                id: profileResponse.data.id,
                firstName: profileResponse.data.localizedFirstName,
                lastName: profileResponse.data.localizedLastName,
                email: emailResponse.data.elements[0]["handle~"].emailAddress,
            };
        } catch (error) {
            console.error("LinkedIn profile error:", error);
            throw new Error("Failed to fetch LinkedIn user data");
        }
    },

    authenticateWithBackend: async (linkedinProfile) => {
        try {
            const response = await axios.post("/api/auth/linkedin", {
                linkedinId: linkedinProfile.id,
                email: linkedinProfile.email,
                firstName: linkedinProfile.firstName,
                lastName: linkedinProfile.lastName,
            });

            return response.data; // Should include JWT token or session info
        } catch (error) {
            console.error("Backend auth error:", error);
            throw new Error("Failed to authenticate with backend");
        }
    },
};

export default linkedinService;
