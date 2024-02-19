import axios from 'axios';

export const apiMex = axios.create({
  baseURL: 'https://mex10.com/api/',
});
