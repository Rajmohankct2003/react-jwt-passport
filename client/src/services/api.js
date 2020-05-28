import axios from 'axios';
const URL = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

const PocFetch = {
  getUserInformation: async () => {
    let response = await URL.get('/protected');
    return response.data;
  },
  create: async (data) => {
    return await URL.post('/register', data);
  },
  login: async (data) => {
    return await URL.post('/login', data);
  },
};

export default PocFetch;
