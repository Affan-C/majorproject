const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userControllers = require("../controllers/users");

router
.route("/signup")
.get(userControllers.renderSignupForm)
.post(wrapAsync(userControllers.signup));


router
.route("/login")
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userControllers.login)
.get(userControllers.renderLoginForm);

router.get("/logout", userControllers.logout);

module.exports = router;