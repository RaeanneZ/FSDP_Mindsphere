const express = require("express");
const axios = require("axios");
const sql = require("mssql");
const dbConfig = require("../dbConfig"); // Correctly importing dbConfig
require("dotenv").config();

const router = express.Router();
const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } =
  process.env;

router.post("/userinfo", async (req, res) => {
  const authHeader = req.headers.authorization;

  console.log("🔄 Received Auth Header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ No valid authorization header provided.");
    return res.status(400).json({
      error: "Access token is required in Authorization header.",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    console.log("🔄 Fetching LinkedIn User Info with token:", accessToken);

    const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("✅ LinkedIn User Profile Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "❌ Error fetching LinkedIn userinfo:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch LinkedIn user profile.",
      details: error.response?.data || error.message,
    });
  }
});

// Exchange Authorization Code for Access Token
router.post("/api/linkedin/token", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    console.log("Authorization Code Received:", code);

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: LINKEDIN_CALLBACK_URL,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET,
    });

    console.log("Token Exchange Payload:", params.toString());

    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("LinkedIn Access Token Response:", response.data);

    const { access_token, expires_in } = response.data;
    console.log(`Access Token: ${access_token}, Expires In: ${expires_in}`); // Debug

    res.status(200).json({ accessToken: access_token });
  } catch (error) {
    console.error(
      "Error fetching LinkedIn access token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

// Store LinkedIn Access Token in Database
router.post("/api/linkedin/store", async (req, res) => {
  const { sub, accessToken } = req.body;

  if (!sub || !accessToken) {
    console.error("Missing required fields:", { sub, accessToken });
    return res.status(400).json({
      error: "Sub (unique LinkedIn ID) and access token are required.",
    });
  }

  try {
    console.log("Storing LinkedIn Data:", { sub, accessToken });

    const query = `
            IF EXISTS (SELECT 1 FROM Account WHERE LinkedInSub = @LinkedInSub)
                UPDATE Account 
                SET LinkedInAccessToken = @AccessToken
                WHERE LinkedInSub = @LinkedInSub
            ELSE
                INSERT INTO Account (LinkedInSub, LinkedInAccessToken, RoleID)
                VALUES (@LinkedInSub, @AccessToken, 2)
        `;

    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    request.input("LinkedInSub", sql.VarChar(255), sub);
    request.input("AccessToken", sql.VarChar(255), accessToken);

    const result = await request.query(query);
    console.log("Query Result:", result);

    res.status(200).json({
      success: true,
      message: "LinkedIn data stored successfully.",
    });
  } catch (error) {
    console.error("Error storing LinkedIn data:", error.message);
    res.status(500).json({
      error: "Failed to store LinkedIn data.",
    });
  }
});

// Fetch User Data Using Access Token (Optional for validation)
router.get("userinfo", async (req, res) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const userInfoResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.status(200).json(userInfoResponse.data);
  } catch (error) {
    console.error(
      "Error fetching LinkedIn user data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch LinkedIn user data" });
  }
});

module.exports = router;
