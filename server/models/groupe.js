import mongoose from "mongoose";

const groupeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photo: { type: String },
  members: [
    {
      user: { type: String },
      role: { type: String }
    }
  ],
  creator: { type: String },
})

const Groupe = mongoose.model("Groupe", groupeSchema);

export default Groupe;