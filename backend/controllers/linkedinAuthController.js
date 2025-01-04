const {
    addOrUpdateAccount,
    findAccountByLinkedInId,
} = require("../models/accountModel");

const handleLinkedInCallback = async (req, res) => {
    try {
        const { id: linkedinId, displayName: name, emails } = req.user;
        const accessToken = req.authInfo.accessToken;

        // Add or update the account
        await addOrUpdateAccount(
            linkedinId,
            name,
            emails[0].value,
            accessToken
        );

        res.status(200).json({
            message: "LinkedIn login successful!",
            user: {
                linkedinId,
                name,
                email: emails[0].value,
            },
        });
    } catch (error) {
        console.error("Error in LinkedIn callback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handleLinkedInCallback };
