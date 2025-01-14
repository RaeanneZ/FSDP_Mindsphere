const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");

/**
 * @swagger
 * tags:
 *   name: Business Enquiries
 *   description: API for managing business enquiries
 */

// ----------------------------------------------------------
// Enquiry Management Routes Region
// ----------------------------------------------------------


router.get("/",businessController.getEnquiries);

router.post("/addBusiness", businessController.addBusiness);


module.exports = router;