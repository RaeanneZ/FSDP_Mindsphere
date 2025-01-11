const express = require("express");
const axios = require("axios");
const db = require("../dbConfig"); // Database connection file
require("dotenv").config();

const router = express.Router();
const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } =
    process.env;

//Exchange Authorization Code for Access Token

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

        const { access_token } = response.data;
        res.status(200).json({ accessToken: access_token });
    } catch (error) {
        console.error(
            "Error fetching LinkedIn access token:",
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch access token" });
    }
});

// Fetch LinkedIn User Profile and Email

router.get("/api/linkedin/user", async (req, res) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
        return res.status(400).json({ error: "Access token is required" });
    }

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

        const userData = profileResponse.data;
        const email = emailResponse.data.elements[0]["handle~"].emailAddress;

        res.status(200).json({ userData, email });
    } catch (error) {
        console.error(
            "Error fetching LinkedIn user data:",
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch LinkedIn user data" });
    }
});

// Store LinkedIn ID and Access Token in Database

router.post("/api/linkedin/store", async (req, res) => {
    const { linkedInId, accessToken } = req.body;

    if (!linkedInId || !accessToken) {
        return res
            .status(400)
            .json({ error: "LinkedIn ID and access token are required" });
    }

    try {
        await db.query(
            "INSERT INTO accounts (linkedin_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?",
            [linkedInId, accessToken, accessToken]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error storing LinkedIn data:", error.message);
        res.status(500).json({ error: "Failed to store LinkedIn data" });
    }
});

// Get Stored LinkedIn Data

router.get("/api/linkedin/stored/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "LinkedIn ID is required" });
    }

    try {
        const [rows] = await db.query(
            "SELECT * FROM accounts WHERE linkedin_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res
                .status(404)
                .json({ error: `No data found for LinkedIn ID: ${id}` });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error retrieving stored data:", error.message);
        res.status(500).json({ error: "Failed to retrieve LinkedIn data" });
    }
});

module.exports = router;
