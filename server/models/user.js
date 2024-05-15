import mongoose, { models } from "mongoose";


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  subscribers: { type: [String] },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;