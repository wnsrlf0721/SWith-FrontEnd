import axios from 'axios';

const initialAxios = axios.create({
  baseURL: '/api',
});

export default initialAxios;
