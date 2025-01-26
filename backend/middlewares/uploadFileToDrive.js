const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const oauth2Client = require('./googleAuth');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const projectRoot = path.resolve(__dirname, '../../');

const uploadFileToDrive = async (filePath, fileName, folderId) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const fileMetadata = {
            name: fileName,
            parents: [folderId],
        };

        const absoluteFilePath = path.resolve(projectRoot, filePath);

        await fs.promises.access(absoluteFilePath);

        const media = {
            body: fs.createReadStream(absoluteFilePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log(`File uploaded successfully with ID: ${response.data.id}`);
        return response.data.id;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found:', filePath);
        } else {
            console.error('Error uploading file to Google Drive:', error);
        }
        throw error;
    }
};

module.exports = uploadFileToDrive;
