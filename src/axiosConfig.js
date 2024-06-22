import axios from 'axios';

const apiData = axios.create({
  baseURL: 'https://lotry.onrender.com/api/', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  }
});

export default apiData;