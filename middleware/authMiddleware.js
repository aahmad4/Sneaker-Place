import Shoe from "../models/shoe.model.js";
import Comment from "../models/comment.model.js";

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Please Login First!");
  res.redirect("/login");
};

export const checkShoeOwnership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const foundShoe = await Shoe.findById(req.params.id);

      if (foundShoe.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "Permission denied, you don't own that item!");
        res.redirect("back");
      }
    } catch (error) {
      req.flash("error", "Item not found!");
      res.redirect("back");
    }
  } else {
    req.flash("error", "Please login first!");
    res.redirect("back");
  }
};

export const checkCommentOwnership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const foundComment = await Comment.findById(req.params.comment_id);

      if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back");
      }
    } catch (error) {
      res.redirect("back");
    }
  } else {
    req.flash("error", "Must be logged in!");
    res.redirect("back");
  }
};
