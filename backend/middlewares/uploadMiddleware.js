const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// File type filter (allowing PDF, JPEG, PNG)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed.")
        );
    }
};

// Define multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file limit
    fileFilter: fileFilter,
});

// ✅ Fix: Export `upload` correctly as an object
module.exports = {
    single: upload.single("attachment"), // For single file uploads
    multiple: upload.array("attachments", 5), // For multiple file uploads (max 5)
};
