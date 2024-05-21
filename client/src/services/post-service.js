import axios from "axios";

const BASE_URL = "http://localhost:5000/posts";

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