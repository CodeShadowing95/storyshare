import mongoose from "mongoose";
import PostMessage from "../models/post.js";


export const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


/**
 * This code defines an asynchronous function getPosts that retrieves a list of posts from the database.
 * It uses PostMessage.find() to fetch posts, sorts them in descending order by _id, and sends the posts as a JSON response with status 200.
 * In case of an error, it responds with the error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the posts are retrieved and sent as a JSON response.
 */
export const getPosts = async (req, res) => {

  try {
    let posts = await PostMessage.find();

    posts = shuffle(posts);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status.json({ message: error.message });
  }
}

/**
 * This code defines an asynchronous function getPost that retrieves a single post based on the id parameter from the request.
 * It uses PostMessage.findById(id) to find the post. If successful, it responds with status 200 and the retrieved post as JSON. If there is an error, it responds with status 404 and an error message.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the post is retrieved and sent as a JSON response.
 */
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * This JavaScript function createPost is an asynchronous Express.js controller for creating a new post in a MongoDB database using Mongoose.
 * 
 * Here's a breakdown:
 * 
 * - The function takes in a request object (req) and a response object (res).
 * - It extracts the post data from the request body (req.body).
 * - It creates a new instance of a PostMessage Mongoose model, which represents a post in the database. The new post is created with properties from the request body, with additional properties creator and createdAt added.
 * - It tries to save the new post to the database using await newPost.save(). If successful, it responds with a status of 201 (Created) and the newly created post in JSON format.
 * - If there's an error during the save operation, it responds with a status of 409 (Conflict) and an error message in JSON format.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the post is created and sent as a JSON response.
 */
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, createdAt: new Date().toISOString() });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

/**
 * This JavaScript function updatePost is an asynchronous Express.js controller for updating a post in a MongoDB database using Mongoose.
 * 
 * Here's a breakdown:
 * - The function takes in a request object (req) and a response object (res).
 * - It extracts the post id from the request parameters (req.params) and the updated post data from the request body (req.body).
 * - It checks if the provided id is a valid MongoDB ObjectId using mongoose.Types.ObjectId.isValid(). If not, it responds with a status of 404 and a message "No post with that id found".
 * - If the id is valid, it uses PostMessage.findByIdAndUpdate() to find and update the post with the provided id. The updated post data is merged with the id and a new option { new: true } is set to return the updated post.
 * - Finally, it responds with a status of 200 and the updated post in JSON format.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise<void>} - A promise that resolves when the post is updated and sent as a JSON response.
 */
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id found");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
}

/**
 * This code snippet defines an asynchronous function deletePost that deletes a post from the database based on the provided id.
 * It first checks if the id is a valid MongoDB ObjectId. If not valid, it returns a 404 status with a message.
 * If valid, it uses PostMessage.findByIdAndRemove(id) to delete the post and then responds with a JSON message indicating successful deletion.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise<void>} - A promise that resolves when the post is deleted and sent as a JSON response.
 */
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id found");
  }

  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: "Post deleted successfully" });
}

/**
 * This code defines an asynchronous function likePost that handles liking/unliking a post.
 * It first checks if the user is authenticated, then finds the post by its id.
 * It checks if the user has already liked the post, adds the like if not, or removes it if already liked. Finally, it updates the post with the new like status and returns the updated post as JSON.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise<void>} - A promise that resolves when the post is liked and sent as a JSON response.
 */
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.json({ message: "Unauthenticated" });
  }

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(userId));

  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(userId));
  }

  await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json({ likes: post.likes, });
}

export const getComments = async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  res.status(200).json(post.comments);
}

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment, idUser, username, imgProfile } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push({ text: comment, userId: idUser, username: username, userAvatar: imgProfile });

  await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json({ message: "Comment added successfully" });
}
