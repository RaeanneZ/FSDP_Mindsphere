const { google } = require('googleapis');
const oauth2Client = require('./googleAuth');

const ensureDriveFolder = async (folderName, parentFolderId) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        console.log(`🔍 Checking if folder "${folderName}" exists under parent "${parentFolderId}"`);

        const query = `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        const response = await drive.files.list({
            q: query,
            fields: 'files(id, name)',
        });

        if (response.data.files.length > 0) {
            console.log(`✅ Folder found: ${response.data.files[0].name} (ID: ${response.data.files[0].id})`);
            return response.data.files[0].id;
        }

        console.log(`📂 Folder "${folderName}" not found. Creating new folder...`);

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId],
        };

        const folder = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });

        console.log(`✅ Folder "${folderName}" created with ID: ${folder.data.id}`);
        return folder.data.id;
    } catch (error) {
        console.error('❌ Error ensuring Drive folder:', error);
        throw error;
    }
};

module.exports = ensureDriveFolder;
