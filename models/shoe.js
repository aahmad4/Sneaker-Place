var mongoose = require("mongoose");
 
var shoeSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
	   id: {
		   type: mongoose.Schema.Types.ObjectId,
		   ref: "User"
	   },
	   username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Shoe", shoeSchema);