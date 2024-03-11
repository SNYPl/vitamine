import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  wishlist: [String],
  isVerified: Boolean,
  verificationToken: String,
  image: String,
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
