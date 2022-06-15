import axios from 'axios';

// const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const BASE_URL = process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;