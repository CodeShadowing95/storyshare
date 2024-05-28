import mongoose from "mongoose";
import Group from "../models/group.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAllPublicGroups = async (req, res) => {
  try {
    const groups = await Group.find({ privacy: "public" });
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getGroups = async (req, res) => {
  const { id } = req.params;

  // console.log(id);

  try {
    const groups = await Group.find()
    .populate("members.user", "imgProfile username _id")
    .populate("creator", "_id");

    // console.log(groups);
    const groupsByCreator = groups.filter(group => group.creator._id.toString() === id);
    res.status(200).json(groupsByCreator);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getGroup = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const group = await Group.findById(id);

    res.status(200).json({ group, message: "Group found" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createGroup = async (req, res) => {
  const group = req.body;
  // console.log(group);

  const newGroup = new Group({ ...group, status: "active" });

  try {
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateGroup = async (req, res) => {
  const { id: _id } = req.params;
  const group = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No group with that id found");
  }

  const updatedGroup = await Group.findByIdAndUpdate(_id, { ...group, _id }, { new: true });

  res.json(updatedGroup);
}

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No group with that id found");
  }

  await Group.findByIdAndDelete(id);

  res.json({ message: "Group deleted successfully" });
}