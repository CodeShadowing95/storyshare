import mongoose from "mongoose";

const interestSchema = mongoose.Schema({
  name: { type: String },
})

const Interest = mongoose.model("Interest", interestSchema);

export default Interest;