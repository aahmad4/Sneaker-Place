import express from "express";
import {
  isLoggedIn,
  checkCommentOwnership,
} from "../middleware/authMiddleware.js";
import {
  getNewCommentFormPage,
  makeComment,
  getEditCommentPage,
  editComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router({ mergeParams: true });

router.route("/new").get(isLoggedIn, getNewCommentFormPage);
router.route("/").post(isLoggedIn, makeComment);
router
  .route("/:comment_id/edit")
  .get(checkCommentOwnership, getEditCommentPage);
router
  .route("/:comment_id")
  .put(checkCommentOwnership, editComment)
  .delete(checkCommentOwnership, deleteComment);

export default router;
