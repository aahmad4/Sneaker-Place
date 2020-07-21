var express = require("express");
var router = express.Router();
var Shoe = require("../models/shoe");

router.get("/", function (req, res) {
  //  Get all shoes from database
  Shoe.find({}, function (err, shoes) {
    if (err) {
      console.log(err);
    } else {
      res.render("shoes/index", { shoes: shoes });
    }
  });
});

router.post("/", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var des = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newShoe = {
    name: name,
    image: image,
    description: des,
    author: author,
    price: price,
  };
  // Create a new shoe and save to database
  Shoe.create(newShoe, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/shoes");
    }
  });
});

router.get("/new", isLoggedIn, function (req, res) {
  res.render("shoes/new");
});

// Shows more info about one shoe entry
router.get("/:id", function (req, res) {
  // Find shoe with provided ID
  Shoe.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundShoe) {
      if (err) {
        console.log(err);
      } else {
        // Render show template with that shoe
        res.render("shoes/show", { shoe: foundShoe });
      }
    });
});

// Edit Shoe Route
router.get("/:id/edit", checkOwnership, function (req, res) {
  Shoe.findById(req.params.id, function (err, foundShoe) {
    res.render("shoes/edit", { shoe: foundShoe });
  });
});

// Update Shoe Route
router.put("/:id", checkOwnership, function (req, res) {
  // Find and update the correct shoe
  Shoe.findByIdAndUpdate(req.params.id, req.body.shoe, function (
    err,
    updatedShoe
  ) {
    if (err) {
      res.redirect("/shoes");
    } else {
      res.redirect("/shoes/" + req.params.id);
    }
  });
});

// Destroy shoe route
router.delete("/:id", checkOwnership, function (req, res) {
  Shoe.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/shoes");
    } else {
      res.redirect("/shoes");
    }
  });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
}

function checkOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Shoe.findById(req.params.id, function (err, foundShoe) {
      if (err) {
        req.flash("error", "Item not found!");
        res.redirect("back");
      } else {
        // Does user own campground
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
}

module.exports = router;
