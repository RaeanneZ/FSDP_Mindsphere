const express = require("express");
const router = express.Router();
const GroupEmailController = require("../controllers/groupEmailController");
const { verifyJWT, authorizeAdmin } = require("../middlewares/authValidate");

router.post(
    "/send-group-email",
    verifyJWT,
    authorizeAdmin,
    GroupEmailController.sendGroupEmail
);

module.exports = router;
