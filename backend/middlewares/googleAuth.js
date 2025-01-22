const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
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

// Ensure the client is authenticated
async function authenticate() {
  try {
    // Attempt to get a new access token
    await oauth2Client.getAccessToken();
    console.log('✅ OAuth2 client is authenticated');
  } catch (error) {
    console.error('❌ Error authenticating OAuth2 client:', error.message);

    console.warn(
      '\nWarning: The Google API refresh token is invalid or expired. Follow these steps to resolve this:\n' +
      '1. Ensure you are logged into Google with the email: mindspheredp@gmail.com.\n' +
      '2. Follow the steps in the script below'
    );

    try {
      const refreshScriptPath = path.resolve(__dirname, './googleAuthRefresh.js');
      const child = spawn('node', [refreshScriptPath], {
        stdio: 'inherit', 
      });
    
      child.on('close', (code) => {
        if (code === 0) {
          console.log('✅');
        } else {
          console.error(`Google Auth Refresh script exited with code ${code}`);
        }
      });
    } catch (spawnError) {
      console.error('❌ Error while attempting to run googleAuthRefresh.js:', spawnError.message);
    }
  }
}

// Authenticate the client without crashing the server
authenticate().catch((err) => {
  console.error('Unhandled authentication error:', err.message);
});

module.exports = oauth2Client;
