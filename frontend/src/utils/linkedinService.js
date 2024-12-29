import axios from "axios";

const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

const linkedinService = {
  getAccessToken: async (code) => {
    if (!code) throw new Error("Authorization code is required");

    try {
      const response = await axios.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        null,
        {
          params: {
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw new Error("Failed to get access token from LinkedIn");
    }
  },

  getUserData: async (accessToken) => {
    if (!accessToken) throw new Error("Access token is required");

    try {
      const profileResponse = await axios.get(
        "https://api.linkedin.com/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const emailResponse = await axios.get(
        "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return {
        profile: profileResponse.data,
        email: emailResponse.data.elements[0]["handle~"].emailAddress,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to retrieve LinkedIn user data");
    }
  },
};

export default linkedinService;
