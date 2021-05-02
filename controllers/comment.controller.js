import Shoe from "../models/shoe.model.js";
import Comment from "../models/comment.model.js";

const getNewCommentFormPage = (req, res) => {
  Shoe.findById(req.params.id, (err, shoe) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { shoe: shoe });
    }
  });
};

const makeComment = (req, res) => {
  // lookup shoe by ID
  Shoe.findById(req.params.id, (err, shoe) => {
    if (err) {
      console.log(err);
      res.redirect("/shoes");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
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
};

const getEditCommentPage = (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        shoe_id: req.params.id,
        comment: foundComment,
      });
    }
  });
};

const editComment = (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/shoes/" + req.params.id);
      }
    }
  );
};

const deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect("back");
    }
  });
};

export {
  getNewCommentFormPage,
  makeComment,
  getEditCommentPage,
  editComment,
  deleteComment,
};
