const passport = require("passport");

// LinkedIn Login
const linkedInLogin = passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
});

// LinkedIn Callback
const linkedInCallback = passport.authenticate("linkedin", {
    failureRedirect: "/login",
    session: false,
});

// Success Handler
const loginSuccess = (req, res) => {
    const user = req.user;
    res.status(200).json({
        message: "Login successful!",
        user,
    });
};

module.exports = {
    linkedInLogin,
    linkedInCallback,
    loginSuccess,
};
