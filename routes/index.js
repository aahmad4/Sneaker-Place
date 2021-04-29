import express from "express";
const router = express.Router();
import passport from "passport";
import request from "request";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
};

router.get("/", (req, res) => {
  res.redirect("/shoes");
});

router.get("/feed", (req, res) => {
  const options = {
    method: "GET",
    url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
    qs: { limit: "100" },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPIKEY,
      "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const parsedData = JSON.parse(body);
      res.render("feed", { parsedData: parsedData });
    }
  });
});

// Show register form
router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shoes");
  } else {
    res.render("register");
  }
});

// Sign Up Logic
router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome " + user.username);
      res.redirect("/shoes");
    });
  });
});

// Show login form
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shoes");
  } else {
    res.render("login");
  }
});

// Handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/shoes",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/shoes");
});

export default router;
