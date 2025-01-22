const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Define the required scope (this is for Google Drive)
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Function to prompt user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Step 1: Generate the authorization URL and prompt the user to visit it
function getAuthUrl() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',  // To get the refresh token
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this URL:', url);
  rl.question('Enter the authorization code from the URL: ', getTokens);
}

// Step 2: Get tokens using the authorization code
function getTokens(code) {
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error retrieving access token:', err);
      rl.close();
      return;
    }

    // Set credentials in the OAuth client
    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    // Save the refresh token to the .env file
    saveRefreshToken(tokens.refresh_token);

    rl.close();
  });
}

// Step 3: Save the refresh token to the .env file
function saveRefreshToken(refreshToken) {
  const envPath = path.resolve(__dirname, '../../.env');
  const envConfig = fs.readFileSync(envPath, 'utf-8').split('\n');
  const updatedConfig = envConfig.map((line) =>
    line.startsWith('GOOGLE_REFRESH_TOKEN=') 
      ? `GOOGLE_REFRESH_TOKEN="${refreshToken}"`
      : line
  ).join('\n');

  fs.writeFileSync(envPath, updatedConfig);
  console.log('✅ Updated refresh token in .env file.');
}

// Start the process by generating the auth URL
getAuthUrl();
