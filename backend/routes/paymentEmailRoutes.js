const express = require("express");
const router = express.Router();
const PaymentEmailController = require("../controllers/paymentEmailController");

router.post(
  "/send-payment-confirmations",
  PaymentEmailController.sendPaymentConfirmations
);
router.post(
  "/send-membership-codes",
  PaymentEmailController.sendMembershipCodes
);

module.exports = router;
