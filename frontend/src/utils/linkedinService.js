import axios from "axios";

const linkedinService = {
  getAccessToken: async (code) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/linkedin/token",
        { code }
      );
      return response.data.access_token;
    } catch (error) {
      console.error(
        "Error fetching access token:",
        error.response?.data || error.message
      );
      throw new Error("Failed to get access token from LinkedIn");
    }
  },

  getUserData: async (accessToken) => {
    try {
      const response = await axios.get("https://api.linkedin.com/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch LinkedIn user data");
    }
  },
};

export default linkedinService;
