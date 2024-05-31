/* eslint-disable no-undef */
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/user' || process.env.BASE_URL + "/user";

export const signup = async (url, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    return { error };
  }
}

export const signin = async (url, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    return { error };
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    
    return response;
  } catch (error) {
    return { error };
  }
}