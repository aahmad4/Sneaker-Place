var express = require("express");
var router = express.Router({ mergeParams: true });
var Shoe = require("../models/shoe");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function (req, res) {
  // Find shoe by ID
  Shoe.findById(req.params.id, function (err, shoe) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { shoe: shoe });
    }
  });
});

router.post("/", isLoggedIn, function (req, res) {
  // lookup shoe by ID
  Shoe.findById(req.params.id, function (err, shoe) {
    if (err) {
      console.log(err);
      res.redirect("/shoes");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          // Add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // Save comment
          comment.save();

          shoe.comments.push(comment);
          shoe.save();
          req.flash("success", "Successfully added comment!");
          res.redirect("/shoes/" + shoe._id);
        }
      });
    }
  });
});

// Comments edit route
router.get("/:comment_id/edit", checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        shoe_id: req.params.id,
        comment: foundComment,
      });
    }
  });
});

// Comment update
router.put("/:comment_id", checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/shoes/" + req.params.id);
    }
  });
});

router.delete("/:comment_id", checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect("back");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
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
}

module.exports = router;
