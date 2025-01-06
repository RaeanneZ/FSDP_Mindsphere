const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_CALLBACK_URL;

// Route to exchange authorization code for an access token
app.post("/api/linkedin/token", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(response.data); // Sends the access token back to the frontend
  } catch (error) {
    console.error(
      "Error fetching LinkedIn access token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

// Route to fetch LinkedIn user data using an access token
app.get("/api/linkedin/user", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const response = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data); // Sends user data back to the frontend
  } catch (error) {
    console.error(
      "Error fetching LinkedIn user data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch LinkedIn user data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
