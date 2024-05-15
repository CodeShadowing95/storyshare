import mongoose from "mongoose";
import Notification from "../models/notification";

export const getNotifications = async (req, res) => {
  const { id } = req.params;

  const notifications = await Notification.find({ user: id }).sort({ datetime: -1 });
  res.status(200).json(notifications);
}

export const deleteNotification = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No notification with that id found");
  }

  await Notification.findByIdAndRemove(_id);
  res.json({ message: "OK" });
}