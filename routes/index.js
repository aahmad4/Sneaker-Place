var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
	res.redirect("/shoes");
});

// Show register form
router.get("/register", function(req, res){
	res.render("register");
});

// Sign Up Logic 
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username);
			res.redirect("/shoes");
		});
	});
});

// Show login form 
router.get("/login", function(req, res){
	res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/shoes",
		failureRedirect: "/login"
	}), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/shoes");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}

module.exports = router;

