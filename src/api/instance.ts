import axios from 'axios';

const baseURL = 'http://api.valantis.store:40000/';

export const api = axios.create({
  baseURL
});