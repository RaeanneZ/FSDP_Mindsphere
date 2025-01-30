const autogenCert = require("../models/autogen-cert");
const uploadFileToDrive = require("../middlewares/uploadFileToDrive");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const generateCert = async (req, res) => {
  const { name, workshop } = req.body;

  // VALIDATION LOGIC
  if (!name || !workshop) {
    return res
      .status(400)
      .send("Invalid Name: Please provide a name and workshop");
  }

  try {
    const certPath = await autogenCert.generateCert(name, workshop);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const dateStr = new Date()
      .toLocaleString("en-GB", options)
      .replace(/\//g, "-")
      .replace(", ", ")-(");

    const fileName = `Certificate_${name}_${workshop}_(${dateStr}).pdf`;

    const FOLDER_ID = process.env.GOOGLE_CERTIFICATES_FOLDER_ID;
    const uploadedFileId = await uploadFileToDrive(
      certPath,
      fileName,
      FOLDER_ID
    );

    const shareUrl = `https://drive.google.com/file/d/${uploadedFileId}/view`;

    res.status(201).json({
      message: "Certificate generated successfully",
      name: name,
      gDriveURL: shareUrl,
      fileId: uploadedFileId,
    });
  } catch (error) {
    res.status(500).send("Error generating certificate");
  }
};

module.exports = { generateCert };
