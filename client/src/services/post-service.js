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

export const updatePost = async (url, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update-post/${url}`, data, {
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