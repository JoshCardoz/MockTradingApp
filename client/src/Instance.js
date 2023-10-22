import axios from 'axios';

const instance = axios.create({
  baseURL: '/users',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`,
  },
});

export default instance;