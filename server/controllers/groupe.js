import mongoose from "mongoose";
import Group from "../models/groupe";

export const getGroups = async (req, res) => {
  try {
    const groups = await Groupe.find();
    res.status(200).json({ data: groups });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createGroup = async (req, res) => {
  const group = req.body;

  const newGroup = new Group({ ...group, creator: req.userId });

  try {
    await newGroup.save();
    res.status(201).json(newGroup);
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

  await Group.findByIdAndRemove(id);

  res.json({ message: "Group deleted successfully" });
}