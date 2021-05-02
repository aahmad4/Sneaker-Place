import passport from "passport";
import axios from "axios";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const getHomePage = (req, res) => {
  res.redirect("/shoes");
};

const getFeedPage = async (req, res) => {
  try {
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
  } catch (error) {
    req.flash("error", "Unable to fetch latest sneaker releases");
    res.redirect("/shoes");
  }
};

const getRegistrationFormPage = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/shoes");
  } else {
    res.render("register");
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username });

    const createdUser = await User.register(newUser, password);

    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome " + createdUser.username);
      res.redirect("/shoes");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("back");
  }
};

const getLoginFormPage = (req, res) => {
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
  getHomePage,
  getFeedPage,
  getRegistrationFormPage,
  registerUser,
  getLoginFormPage,
  logoutUser,
  loginUser,
};
