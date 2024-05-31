import axios from 'axios';

const BASE_URL = 'http://100.20.92.101:4130';

export const postAction = async (url, data) => {
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