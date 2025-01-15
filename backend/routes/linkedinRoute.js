const express = require("express");
const axios = require("axios");
const sql = require("mssql");
const dbConfig = require("../dbConfig"); // Correctly importing dbConfig
require("dotenv").config();

const router = express.Router();
const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } =
    process.env;

// Exchange Authorization Code for Access Token
router.post("/api/linkedin/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res
            .status(400)
            .json({ error: "Authorization code is required" });
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
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const emailResponse = await axios.get(
            "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const userProfile = {
            id: profileResponse.data.id,
            firstName: profileResponse.data.localizedFirstName,
            lastName: profileResponse.data.localizedLastName,
            email: emailResponse.data.elements[0]["handle~"].emailAddress,
        };

        res.status(200).json(userProfile);
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
    const { email, linkedInId, accessToken } = req.body;

    if (!email || !linkedInId || !accessToken) {
        console.error("Missing required fields:", {
            email,
            linkedInId,
            accessToken,
        });
        return res.status(400).json({
            error: "Email, LinkedIn ID, and access token are required.",
        });
    }

    try {
        console.log("Storing LinkedIn Data:", {
            email,
            linkedInId,
            accessToken,
        });

        const query = `
            IF EXISTS (SELECT 1 FROM Account WHERE Email = @Email)
                UPDATE Account 
                SET LinkedInID = @LinkedInID, LinkedInAccessToken = @AccessToken
                WHERE Email = @Email
            ELSE
                INSERT INTO Account (Email, LinkedInID, LinkedInAccessToken)
                VALUES (@Email, @LinkedInID, @AccessToken)
        `;

        console.log("Executing Query:", query);

        const pool = await sql.connect(dbConfig);
        const request = pool.request();
        request.input("Email", sql.VarChar(50), email);
        request.input("LinkedInID", sql.VarChar(255), linkedInId);
        request.input("AccessToken", sql.VarChar(255), accessToken);

        const result = await request.query(query);
        console.log("Query Result:", result);

        res.status(200).json({
            success: true,
            message: "LinkedIn data stored successfully.",
        });
    } catch (error) {
        console.error("Error storing LinkedIn data:", error.message);
        res.status(500).json({ error: "Failed to store LinkedIn data." });
    }
});

// Get Stored LinkedIn Data
router.get("/api/linkedin/stored/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "LinkedIn ID is required" });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input("LinkedInID", sql.VarChar(255), id)
            .query("SELECT * FROM Account WHERE LinkedInID = @LinkedInID");

        if (result.recordset.length === 0) {
            return res
                .status(404)
                .json({ error: `No data found for LinkedIn ID: ${id}` });
        }

        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error retrieving stored data:", error.message);
        res.status(500).json({ error: "Failed to retrieve LinkedIn data" });
    }
});

module.exports = router;
