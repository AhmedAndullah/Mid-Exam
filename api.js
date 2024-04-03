// api.js
import axios from 'axios';

export const fetchBooks = async () => {
  try {
    const response = await axios.get('https://dev.iqrakitab.net/api/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
