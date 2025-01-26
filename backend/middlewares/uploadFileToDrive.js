const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const oauth2Client = require('./googleAuth');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const FOLDER_ID = process.env.GOOGLE_SURVEYS_FOLDER_ID;

const projectRoot = path.resolve(__dirname, '../../');

const uploadFileToDrive = async (filePath, fileName, FOLDER_ID) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const fileMetadata = {
            name: fileName,
            parents: [FOLDER_ID]
        };

        const absoluteFilePath = path.resolve(projectRoot, filePath);

        setTimeout(async () => {
            try {
                await fs.promises.access(absoluteFilePath);

                const media = {
                    body: fs.createReadStream(absoluteFilePath),
                };

                const file = await drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                });

                console.log(`File uploaded successfully with ID: ${file.data.id}`);
                return file.data.id;
            } catch (err) {
                console.error('File not found:', absoluteFilePath);
                console.error(err)
                return;
            }
        }, 1000);
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw error;
    }
};

module.exports = uploadFileToDrive;
