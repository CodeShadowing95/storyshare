import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imgProfile: { type: String, default: "" },
  biography: { type: String, default: "" },
  friends: { type: [String] },
  groups: { type: [String] },
});

const User = mongoose.model("User", userSchema);

export default User;