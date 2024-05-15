import mongoose, { models } from "mongoose";

const storySchema = mongoose.Schema({
  creator: String,
  content: [
    { text: String },
    { video: String },
    { image: String },
  ],
  views: Number,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      text : String,
      user: String
    },
  ],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Story = mongoose.model("Story", storySchema);

export default Story;