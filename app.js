import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Shoe from "./models/shoe.js";
import Comment from "./models/comment.js";
import User from "./models/user.js";
import seedDB from "./seeds.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import methodOverride from "method-override";
import flash from "connect-flash";
import { dirname } from "path";
import { fileURLToPath } from "url";

import commentRoutes from "./routes/comments.js";
import shoeRoutes from "./routes/shoes.js";
import indexRoutes from "./routes/index.js";

import session from "express-session";
import MongoStore from "connect-mongo";

const url = process.env.DATABASEURL || "mongodb://localhost:27017/xtocks";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// Seed the database
// seedDB();

// Passport Configuration
app.use(
  session({
    secret: "Something random lol",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/shoes", shoeRoutes);
app.use("/shoes/:id/comments", commentRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
