import axios from 'axios';

const baseURL = 'https://api.valantis.store:41000/';

export const api = axios.create({
  baseURL
});