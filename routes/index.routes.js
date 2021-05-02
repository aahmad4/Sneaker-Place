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

const router = express.Router();

router.route("/").get(homePage);
router.route("/feed").get(feedPage);
router.route("/register").get(registrationForm).post(registerUser);
router.route("/login").get(loginForm).post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
