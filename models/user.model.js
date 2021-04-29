import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;
