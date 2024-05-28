import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupeSchema = mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "Autre" },
  image: { type: String },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: { type: String, default: "member" },
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      default: []
    }
  ],
  status: { type: String, default: "active" },
  privacy: { type: String },
  createdAt: { type: Date, default: new Date().toISOString() },
})

groupeSchema.pre('find', function (next){
  this.populate('members.user', 'imgProfile');
  next();
})

const Group = mongoose.model("Group", groupeSchema);

export default Group;