import mongoose from "mongoose";


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
      text: { type: String },
      user: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

// Create a new Mongoose model for the PostMessage schema.
// The first argument is the singular name of the collection that this model will be associated with in the MongoDB database.
// The second argument is the schema that defines the structure of the documents in this collection.
// This model will be used to interact with the PostMessage collection in the MongoDB database.
// When we create a new instance of this model, Mongoose will create a new document in the PostMessage collection with the properties defined in our schema.
// When we read or update documents in the PostMessage collection, Mongoose will use this model to shape and validate the documents.
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;