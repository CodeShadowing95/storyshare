import mongoose from "mongoose";

const groupeSchema = mongoose.Schema({
  creator: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  photo: { type: String },
  members: [
    {
      user: { type: String },
      role: { type: String }
    }
  ],
})

const Group = mongoose.model("Group", groupeSchema);

export default Group;