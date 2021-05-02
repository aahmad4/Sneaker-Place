import Shoe from "../models/shoe.model.js";
import Comment from "../models/comment.model.js";

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
};

export const checkOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Shoe.findById(req.params.id, (err, foundShoe) => {
      if (err) {
        req.flash("error", "Item not found!");
        res.redirect("back");
      } else {
        // Does user own shoe
        if (foundShoe.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "Permission denied, you don't own that item!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login first!");
    res.redirect("back");
  }
};

export const checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        // Does user own comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Must be logged in!");
    res.redirect("back");
  }
};
