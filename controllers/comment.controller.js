import Shoe from "../models/shoe.model.js";
import Comment from "../models/comment.model.js";

const getNewCommentFormPage = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    res.render("comments/new", { shoe });
  } catch (error) {
    console.log(error);
  }
};

const makeComment = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    const comment = await Comment.create(req.body.comment);

    comment.author.id = req.user._id;
    comment.author.username = req.user.username;

    await comment.save();

    shoe.comments.push(comment);

    await shoe.save();

    req.flash("success", "Successfully added comment!");
    res.redirect("/shoes/" + shoe._id);
  } catch (error) {
    console.log(error);
    res.redirect("/shoes");
  }
};

const getEditCommentPage = async (req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.comment_id);

    res.render("comments/edit", {
      shoe_id: req.params.id,
      comment: foundComment,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

const editComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);

    res.redirect("/shoes/" + req.params.id);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.comment_id);

    req.flash("success", "Comment deleted!");
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

export {
  getNewCommentFormPage,
  makeComment,
  getEditCommentPage,
  editComment,
  deleteComment,
};
