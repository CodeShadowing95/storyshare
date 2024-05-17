import mongoose from "mongoose";


const postSchema = mongoose.Schema({
  postText: String,
  description: String,
  creator: String,
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