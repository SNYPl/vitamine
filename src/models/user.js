import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mrole:String,
  wishlist: [String],
  isVerified: Boolean,
  verificationToken: String,
  image: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
    required: true
  },
}, {
  timestamps: true
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
