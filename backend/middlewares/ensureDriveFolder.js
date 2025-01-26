const { google } = require('googleapis');
const oauth2Client = require('./googleAuth');

const ensureDriveFolder = async (folderName, parentFolderId) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const query = `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        const response = await drive.files.list({
            q: query,
            fields: 'files(id, name)',
        });

        if (response.data.files.length > 0) {
            return response.data.files[0].id;
        }

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId],
        };

        const folder = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });

        return folder.data.id;
    } catch (error) {
        console.error('Error ensuring Drive folder:', error);
        throw error;
    }
};

module.exports = ensureDriveFolder;