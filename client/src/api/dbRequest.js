import axios from 'axios';

export const createUser = (regData) => {
  return axios.post('/api/registration', regData);
}
export const login = (loginData) => {
  return axios.post('/api/login', loginData);
}