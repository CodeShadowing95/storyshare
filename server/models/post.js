import mongoose, { models } from "mongoose";


const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  images: [String],
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      text: String,
      user: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;