import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  creator: { type: String },
  content: [
    { text: { type: String } },
    { video: { type: String } },
    { image: { type: String } },
  ],
  interactions: [
    {
      views: { type: Number },
      likes: { type: Number },
      comments: [
        {
          text : { type: String },
          user: { type: String }
        },
      ]
    },
  ],
  datetime: { type: Date },
});

const Story = mongoose.model("Story", storySchema);

export default Story;