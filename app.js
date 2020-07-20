var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Shoe          = require("./models/shoe"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
	shoeRoutes = require("./routes/shoes"),
	indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/xtocks", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://aahmad4:aahmad4@cluster0.mfoxo.mongodb.net/xtocks?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// Seed the database
// seedDB();

// Passport Configuration
app.use(require("express-session")({
	secret: "Something random lol",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes); 
// Appends /shoes infront of all shoe routes
app.use("/shoes", shoeRoutes);
app.use("/shoes/:id/comments", commentRoutes);

app.listen(3000, function() { 
  console.log('XtockS Server listening on port 3000'); 
});