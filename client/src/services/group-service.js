/* eslint-disable no-undef */
import axios from "axios";

const BASE_URL = "http://100.20.92.101:4130/groups" || process.env.BASE_URL + "/groups";

export const getPublicGroups = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/public`);
    return response;
  } catch (error) {
    return { error };
  }
}

export const getGroups = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response;
  } catch (error) {
    return { error };
  }
}

export const getGroup = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response;
  } catch (error) {
    return { error };
  }
}

export const createGroup = async (url, data) => {
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

export const updateGroup = async (url, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${url}`, data, {
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

export const deleteGroup = async (url) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${url}`);
    return response;
  } catch (error) {
    return { error };
  }
}