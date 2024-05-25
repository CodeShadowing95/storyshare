import mongoose from "mongoose";
const Schema = mongoose.Schema;


const postSchema = mongoose.Schema({
  postText: String,
  description: String,
  creator: String,
  creatorAvatar: { type: String, default: "" },
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
      userId: String,
      username:  String,
      userAvatar: { type: String, default: "" },
      createdAt: { type: Date, default: new Date() },
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'User',
      //   default: null
      // },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostMessage = mongoose.model('post', postSchema);

export default PostMessage;