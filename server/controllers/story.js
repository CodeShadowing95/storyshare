import mongoose from "mongoose";
import Story from "../models/story";

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ _id: -1 });
    res.status(200).json({ data: stories });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getStory = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);
    res.status(200).json({ data: story });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createStory = async (req, res) => {
  const story = req.body;

  const newStory = new Story({ ...story, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const editStory = async (req, res) => {
  const { id: _id } = req.params;

  const story = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No story with that id found");
  }

  const editedStory = await Story.findByIdAndUpdate(_id, { ...story, _id }, { new: true });

  res.json(editedStory);
}

export const deleteStory = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No story with that id found");
  }

  await Story.findByIdAndRemove(id);

  res.json({ message: "Story deleted successfully" });
}

export const likeStory = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  const story = await Story.findById(id);

  const index = story.likes.findIndex((id) => id === String(req.userId));
  
  if (index === -1) {
    story.likes.push(req.userId);
  } else {
    story.likes = story.likes.filter((id) => id !== String(req.userId));
  }

  const likedStory = await Story.findByIdAndUpdate(id, story, { new: true });

  res.json(likedStory);
}