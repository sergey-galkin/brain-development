import axios from 'axios';

export const createUser = (regData) => {
  return axios.post('/api/registration', regData);
}
export const authentication = (authData) => {
  return axios.post('/api/authentication', authData);
}