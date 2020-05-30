import axios from 'axios';
const URL = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
});

const PocFetch = {
  googleLogin: async (response) => {
    const { profileObj, googleId } = response;
    const googleresponse = {
      name: profileObj.name,
      email: profileObj.email,
      providerId: googleId,
      imageUrl: profileObj.imageUrl,
      provider: 'Google',
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
