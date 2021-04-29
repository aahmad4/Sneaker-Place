import express from "express";
import {
  homePage,
  feedPage,
  registrationForm,
  registerUser,
  loginForm,
  logoutUser,
  loginUser,
} from "../controllers/index.controller.js";

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
};

const router = express.Router();

router.route("/").get(homePage);
router.route("/feed").get(feedPage);
router.route("/register").get(registrationForm).post(registerUser);
router.route("/login").get(loginForm).post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
