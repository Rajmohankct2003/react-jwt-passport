import axios from 'axios';
const URL = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

const PocFetch = {
  googleLogin: async (response) => {
    const { accessToken } = response;
    if (!accessToken) return null;
    const googleresponse = {
      access_token: accessToken,
    };
    let result = await URL.post('login/google', googleresponse);
    return result.data;
  },
  getUserInformation: async () => {
    const user = JSON.parse(localStorage.getItem('@pocpassaport'));
    let response = await URL.get('protected', {
      headers: { Authorization: user.token },
    });
    return response.data.user;
  },
  create: async (data) => {
    return await URL.post('/register', data);
  },
  login: async (data) => {
    return await URL.post('/login', data);
  },
};

export default PocFetch;
