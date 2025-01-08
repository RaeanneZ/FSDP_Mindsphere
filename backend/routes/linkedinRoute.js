const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } =
    process.env;

// Route to exchange authorization code for an access token
router.post("/api/linkedin/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res
            .status(400)
            .json({ error: "Authorization code is required" });
    }

    try {
        const response = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
                redirect_uri: LINKEDIN_CALLBACK_URL,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        res.status(200).json(response.data); // Send access token back to frontend
    } catch (error) {
        console.error(
            "Error fetching LinkedIn access token:",
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch access token" });
    }
});

// Route to fetch LinkedIn user data using an access token
router.get("/api/linkedin/user", async (req, res) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
        return res.status(400).json({ error: "Access token is required" });
    }

    try {
        const response = await axios.get("https://api.linkedin.com/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        res.status(200).json(response.data); // Send LinkedIn user data
    } catch (error) {
        console.error(
            "Error fetching LinkedIn user data:",
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch LinkedIn user data" });
    }
});

module.exports = router;
