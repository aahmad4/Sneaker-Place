import express from "express";
import {
  getAllShoes,
  makeShoe,
  getNewShoeFormPage,
  getShoeInfoPage,
  getEditShoePage,
  editShoe,
  deleteShoe,
  purchaseShoe,
} from "../controllers/shoe.controller.js";
import {
  isLoggedIn,
  checkShoeOwnership,
} from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllShoes).post(isLoggedIn, makeShoe);
router.route("/new").get(isLoggedIn, getNewShoeFormPage);
router
  .route("/:id")
  .get(getShoeInfoPage)
  .put(checkShoeOwnership, editShoe)
  .delete(checkShoeOwnership, deleteShoe);
router.route("/:id/edit").get(checkShoeOwnership, getEditShoePage);
router.route("/purchase").post(purchaseShoe);

export default router;
