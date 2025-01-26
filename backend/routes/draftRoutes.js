const express = require("express");
const router = express.Router();
const DraftController = require("../controllers/draftController");
const { verifyJWT, authorizeAdmin } = require("../middlewares/authValidate");

// Routes for drafts
router.post("/", verifyJWT, DraftController.createDraft);
router.get("/", verifyJWT, DraftController.getAllDrafts);
router.get("/:draftID", verifyJWT, DraftController.getDraftById);
router.put("/:draftID", verifyJWT, DraftController.updateDraft);
router.delete("/:draftID", verifyJWT, DraftController.deleteDraft);

module.exports = router;
