const express = require("express");
const passport = require("passport");
const { handleLinkedInCallback } = require("../controllers/authController");

const router = express.Router();

// LinkedIn Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: process.env.LINKEDIN_CALLBACK_URL,
            scope: ["r_liteprofile", "r_emailaddress"],
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile, { accessToken });
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
router.get(
    "/linkedin",
    passport.authenticate("linkedin", {
        scope: ["r_liteprofile", "r_emailaddress"],
    })
);

router.get(
    "/linkedin/callback",
    passport.authenticate("linkedin", { session: false }),
    handleLinkedInCallback
);

module.exports = router;
