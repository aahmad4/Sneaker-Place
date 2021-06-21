import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import passport from "passport";
import LocalStrategy from "passport-local";
import methodOverride from "method-override";
import flash from "connect-flash";
import { dirname } from "path";
import { fileURLToPath } from "url";
import User from "./models/user.model.js";
import indexRoutes from "./routes/index.routes.js";
import shoeRoutes from "./routes/shoe.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use(flash());

const MongoStore = connectMongo(session);

const store = new MongoStore({
  url: process.env.DATABASEURL || "mongodb://localhost:27017/sneakerplace",
  secret: "Something random lol",
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    secret: "Something random lol",
    resave: false,
    saveUninitialized: false,
    store,
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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
