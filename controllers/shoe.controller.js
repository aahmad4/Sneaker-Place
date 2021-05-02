import Stripe from "stripe";
import dotenv from "dotenv";
import Shoe from "../models/shoe.model.js";
import { escapeRegex } from "../util/escapeRegex.js";

dotenv.config();

const stripe = new Stripe(process.env.PRIVATEKEY);

const getAllShoes = async (req, res) => {
  let noMatch = undefined;
  let yesMatch = undefined;

  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");

    try {
      const shoes = await Shoe.find({ name: regex });

      if (shoes.length < 1) {
        noMatch = "Sorry, no shoes matching that criteria were found!";
      } else if (shoes.length >= 1) {
        yesMatch = shoes.length;
      }

      res.render("shoes/index", { shoes, noMatch, yesMatch });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const shoes = await Shoe.find({});

      res.render("shoes/index", { shoes, noMatch, yesMatch });
    } catch (error) {
      console.log(error);
    }
  }
};

const makeShoe = async (req, res) => {
  const { name, price, image, description } = req.body;

  const author = {
    id: req.user._id,
    username: req.user.username,
  };

  const newShoe = {
    name,
    image,
    description,
    author,
    price,
  };

  try {
    await Shoe.create(newShoe);

    res.redirect("/shoes");
  } catch (error) {
    console.log(error);
  }
};

const getNewShoeFormPage = (req, res) => {
  res.render("shoes/new");
};

const getShoeInfoPage = (req, res) => {
  Shoe.findById(req.params.id)
    .populate("comments")
    .exec((err, foundShoe) => {
      if (err) {
        console.log(err);
      } else {
        res.render("shoes/show", { shoe: foundShoe });
      }
    });
};

const getEditShoePage = async (req, res) => {
  const foundShoe = await Shoe.findById(req.params.id);

  res.render("shoes/edit", { shoe: foundShoe });
};

const editShoe = async (req, res) => {
  try {
    await Shoe.findByIdAndUpdate(req.params.id, req.body.shoe);

    res.redirect("/shoes/" + req.params.id);
  } catch (error) {
    res.redirect("/shoes");
  }
};

const deleteShoe = async (req, res) => {
  await Shoe.findByIdAndRemove(req.params.id);

  res.redirect("/shoes");
};

const purchaseShoe = async (req, res) => {
  try {
    await stripe.charges.create({
      amount: req.body.total,
      source: req.body.stripeTokenId,
      currency: "usd",
    });

    console.log("Charge Successful");
    res.json({ message: "Successfully purchased item" });
  } catch (error) {
    console.log("Charge failure");
    res.status(500).end();
  }
};

export {
  getAllShoes,
  makeShoe,
  getNewShoeFormPage,
  getShoeInfoPage,
  getEditShoePage,
  editShoe,
  deleteShoe,
  purchaseShoe,
};
