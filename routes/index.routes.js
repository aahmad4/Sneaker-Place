import express from "express";
import {
  getHomePage,
  getFeedPage,
  getRegistrationFormPage,
  registerUser,
  getLoginFormPage,
  logoutUser,
  loginUser,
} from "../controllers/index.controller.js";

const router = express.Router();

router.route("/").get(getHomePage);
router.route("/feed").get(getFeedPage);
router.route("/register").get(getRegistrationFormPage).post(registerUser);
router.route("/login").get(getLoginFormPage).post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
