import asyncHandler from "express-async-handler";
import passport from "passport";
import axios from "axios";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const homePage = (req, res) => {
  res.redirect("/shoes");
};

const feedPage = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
    {
      params: { limit: "100" },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPIKEY,
        "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
      },
    }
  );

  res.render("feed", { parsedData: data });
});

const registrationForm = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shoes");
  } else {
    res.render("register");
  }
};

const registerUser = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username: username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome " + user.username);
      res.redirect("/shoes");
    });
  });
};

const loginForm = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shoes");
  } else {
    res.render("login");
  }
};

const logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/shoes");
};

const loginUser = passport.authenticate("local", {
  successRedirect: "/shoes",
  failureRedirect: "/login",
});

export {
  homePage,
  feedPage,
  registrationForm,
  registerUser,
  loginForm,
  logoutUser,
  loginUser,
};
