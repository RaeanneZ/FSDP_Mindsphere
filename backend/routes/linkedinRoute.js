const express = require("express");
const axios = require("axios");
const sql = require("mssql");
const dbConfig = require("../dbConfig"); // Correctly importing dbConfig
require("dotenv").config();

const router = express.Router();
const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_CALLBACK_URL } =
    process.env;

router.post("/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res
            .status(400)
            .json({ error: "Authorization code is required." });
    }

    try {
        console.log("🔄 Attempting to exchange LinkedIn code for token:", code);
        console.log("🔎 Using Redirect URI:", LINKEDIN_CALLBACK_URL);
        console.log("🔎 Using Client ID:", LINKEDIN_CLIENT_ID);
        console.log(
            "🔎 Using Client Secret:",
            LINKEDIN_CLIENT_SECRET ? "Exists ✅" : "Missing ❌"
        );

        const params = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: LINKEDIN_CALLBACK_URL,
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
        });

        const response = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            params.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const accessToken = response.data.access_token;
        if (!accessToken) {
            throw new Error("No access token received.");
        }

        console.log("✅ LinkedIn Access Token:", accessToken);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(
            "❌ Error fetching LinkedIn access token:",
            error.response?.data || error.message
        );
        res.status(500).json({
            error: "Failed to fetch access token",
            details: error.response?.data || error.message,
        });
    }
});

// Fetch LinkedIn User Profile Using OpenID Connect
router.post("/userinfo", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Access token is required." });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        console.log("🔄 Fetching LinkedIn User Info with token:", accessToken);

        const response = await axios.get(
            "https://api.linkedin.com/v2/userinfo",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        console.log("✅ LinkedIn User Profile:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error(
            "❌ LinkedIn user profile error:",
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch user profile." });
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

router.post("/linkedin", async (req, res) => {
    // `/linkedin` inside `/api/auth`
    const { linkedinId, email, firstName, lastName } = req.body;

    if (!linkedinId || !email) {
        return res.status(400).json({ error: "Missing LinkedIn user data." });
    }

    try {
        console.log("🔄 Authenticating LinkedIn user:", { linkedinId, email });

        const pool = await sql.connect(dbConfig);
        const request = pool.request();
        request.input("LinkedInId", sql.VarChar(255), linkedinId);
        request.input("Email", sql.VarChar(255), email);
        request.input("FirstName", sql.VarChar(255), firstName);
        request.input("LastName", sql.VarChar(255), lastName);

        // Check if user exists
        const userQuery = `SELECT * FROM Account WHERE LinkedInId = @LinkedInId OR Email = @Email`;
        const existingUser = await request.query(userQuery);

        let user;
        if (existingUser.recordset.length > 0) {
            user = existingUser.recordset[0];
            console.log("✅ Existing user found:", user);
        } else {
            // Insert new user
            const insertQuery = `
                INSERT INTO Account (LinkedInId, Email, FirstName, LastName, RoleID)
                VALUES (@LinkedInId, @Email, @FirstName, @LastName, 2)
                SELECT SCOPE_IDENTITY() AS UserId;
            `;
            const result = await request.query(insertQuery);
            user = {
                UserId: result.recordset[0].UserId,
                Email: email,
                FirstName: firstName,
                LastName: lastName,
            };
            console.log("✅ New LinkedIn user created:", user);
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("❌ Error authenticating LinkedIn user:", error.message);
        res.status(500).json({
            error: "Failed to authenticate LinkedIn user.",
        });
    }
});

module.exports = router;
