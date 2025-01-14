const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Set the credentials with the refresh token
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Ensure the client is authenticated (this is important to avoid issues with unauthorized requests)
async function authenticate() {
  try {
    // Get a new access token if necessary
    await oauth2Client.getAccessToken();
    console.log('✅ OAuth2 client is authenticated');
  } catch (error) {
    console.error('Error authenticating OAuth2 client:', error.message);
    throw error;
  }
}

authenticate();

module.exports = oauth2Client;
