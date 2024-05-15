import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  content: { type: String },
  user: { type: String },
  status: { type: String },
  datetime: { type: Date },
})

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;