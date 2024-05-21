import mongoose from "mongoose";


const postSchema = mongoose.Schema({
  postText: String,
  description: String,
  creator: String,
  images: [
    {
      id: String,
      src: String,
    }
  ],
  tags: { type: [String], default: [] },
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

const PostMessage = mongoose.model('post', postSchema);

export default PostMessage;