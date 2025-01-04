const sql = require("mssql");

// Add or update account with LinkedIn details
const addOrUpdateAccount = async (linkedinId, name, email, accessToken) => {
    const query = `
        MERGE Account AS target
        USING (SELECT @linkedinId AS LinkedInID, @name AS Name, @Email AS Email, @accessToken AS LinkedInAccessToken) AS source
        ON target.Email = source.Email
        WHEN MATCHED THEN
            UPDATE SET 
                LinkedInID = source.LinkedInID,
                Name = source.Name,
                LinkedInAccessToken = source.LinkedInAccessToken
        WHEN NOT MATCHED THEN
            INSERT (Name, Email, LinkedInID, LinkedInAccessToken, Salt, HashedPassword)
            VALUES (source.Name, source.Email, source.LinkedInID, source.LinkedInAccessToken, '', '');
    `;

    const request = new sql.Request();
    request.input("linkedinId", sql.VarChar, linkedinId);
    request.input("name", sql.VarChar, name);
    request.input("email", sql.VarChar, email);
    request.input("accessToken", sql.VarChar, accessToken);
    return await request.query(query);
};

// Find account by LinkedIn ID
const findAccountByLinkedInId = async (linkedinId) => {
    const query = `SELECT * FROM Account WHERE LinkedInID = @linkedinId`;

    const request = new sql.Request();
    request.input("linkedinId", sql.VarChar, linkedinId);
    const result = await request.query(query);

    return result.recordset[0];
};

module.exports = { addOrUpdateAccount, findAccountByLinkedInId };
