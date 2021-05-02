import express from "express";
import Shoe from "../models/shoe.model.js";
import { isLoggedIn, checkOwnership } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/", (req, res) => {
  var noMatch = undefined;
  var yesMatch = undefined;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Shoe.find({ name: regex }, (err, shoes) => {
      if (err) {
        console.log(err);
      } else if (shoes.length < 1) {
        noMatch = "Sorry, no shoes matching that criteria were found!";
      } else if (shoes.length >= 1) {
        yesMatch = shoes.length;
      }
      res.render("shoes/index", {
        shoes: shoes,
        noMatch,
        noMatch,
        yesMatch: yesMatch,
      });
    });
  } else {
    //  Get all shoes from database
    Shoe.find({}, (err, shoes) => {
      if (err) {
        console.log(err);
      } else {
        res.render("shoes/index", {
          shoes: shoes,
          noMatch: noMatch,
          yesMatch: yesMatch,
        });
      }
    });
  }
});

router.post("/", isLoggedIn, (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const des = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newShoe = {
    name: name,
    image: image,
    description: des,
    author: author,
    price: price,
  };
  // Create a new shoe and save to database
  Shoe.create(newShoe, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/shoes");
    }
  });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("shoes/new");
});

// Shows more info about one shoe entry
router.get("/:id", (req, res) => {
  // Find shoe with provided ID
  Shoe.findById(req.params.id)
    .populate("comments")
    .exec((err, foundShoe) => {
      if (err) {
        console.log(err);
      } else {
        // Render show template with that shoe
        res.render("shoes/show", { shoe: foundShoe });
      }
    });
});

// Edit Shoe Route
router.get("/:id/edit", checkOwnership, (req, res) => {
  Shoe.findById(req.params.id, (err, foundShoe) => {
    res.render("shoes/edit", { shoe: foundShoe });
  });
});

// Update Shoe Route
router.put("/:id", checkOwnership, (req, res) => {
  // Find and update the correct shoe
  Shoe.findByIdAndUpdate(req.params.id, req.body.shoe, (err, updatedShoe) => {
    if (err) {
      res.redirect("/shoes");
    } else {
      res.redirect("/shoes/" + req.params.id);
    }
  });
});

// Destroy shoe route
router.delete("/:id", checkOwnership, (req, res) => {
  Shoe.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/shoes");
    } else {
      res.redirect("/shoes");
    }
  });
});

router.post("/purchase", (req, res) => {
  stripe.charges
    .create({
      amount: req.body.total,
      source: req.body.stripeTokenId,
      currency: "usd",
    })
    .then(() => {
      console.log("Charge Successful");
      res.json({ message: "Successfully purchased item" });
    })
    .catch(() => {
      console.log("Charge failure");
      res.status(500).end();
    });
});

export default router;
