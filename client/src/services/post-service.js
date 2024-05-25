import axios from "axios";

const BASE_URL = "http://localhost:5000/posts";

export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getPost = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const createPost = async (url, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return response;
  } catch (error) {
    return { error };
  }
}

export const updatePost = async (id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update-post/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return response;
  } catch (error) {
    return { error };
  }
}

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-post/${id}`);

    return response;
  } catch (error) {
    return { error };
  }
}

export const addLike = async (url, userId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${url}`, { userId }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getPostComments = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addComment = async (url, comment, user) => {
  const { _id: idUser, username, imgProfile } = user;
  try {
    const response = await axios.patch(`${BASE_URL}/${url}`, { comment, idUser, username, imgProfile }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}