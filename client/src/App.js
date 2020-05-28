import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
import './assets/main.css';
import PageNotFound from './components/PageNotFound';
import AuthorizedRoute from './utils/AuthorizedRoute';
import linus from './images/linus.jpg';
import Form from './components/Form';
import api from './services/api';
import axios from 'axios';

const AuthorizedLayout = () => {
  const history = useHistory();
  const [user, setUser] = useState('');

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem('@pocpassaport'));
    let result = await axios.get('http://localhost:4000/api/protected', {
      headers: { Authorization: token.token },
    });
    setUser(result.data.user.email);
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('@pocpassaport');
    history.push('/auth');
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='p-2'>HEY, {user}</h1>
      <button
        onClick={handleLogout}
        className='border p-2 hover:bg-gray-400 focus:outline-none'
      >
        Logout
      </button>
    </div>
  );
};

const AuthPage = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });

  const handleInputLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleInputRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    let result = await api.login(loginData);
    localStorage.setItem('@pocpassaport', JSON.stringify(result.data));
    console.log(localStorage);
    history.push('/');
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    let result = await api.create(registerData);
    localStorage.setItem('@pocpassaport', JSON.stringify(result.data));
    console.log(localStorage);
    history.push('/');
  };

  const isDisabled = (state) => {
    return state.email === '' || state.password === '';
  };

  return (
    <div className='w-screen h-screen bg-gray-700'>
      <div className='flex flex-col-reverse sm:flex-row items-center justify-center h-screen overflow-hidden '>
        <div className='w-2/4 max-w-md w-full '>
          <nav>
            <ul className='flex justify-around bg-gray-600 py-3 text-gray-100 '>
              <li>
                <NavLink
                  isActive={(match) => {
                    if (!match) {
                      return false;
                    }
                    return match.isExact;
                  }}
                  activeClassName=' border-solid border-2 p-2 border-blue-400'
                  className='px-10 text-gray-100'
                  to='/auth'
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName=' border-solid border-2 p-2 border-blue-400'
                  className='px-10 text-gray-100'
                  to='/auth/register'
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact strict path='/auth'>
              <Form
                titleBtn='Login'
                OnSubmit={handleLogin}
                data={loginData}
                isDisabled={() => isDisabled(loginData)}
                setData={handleInputLogin}
              />
            </Route>
            <Route exact path='/auth/register'>
              <Form
                titleBtn='Register'
                OnSubmit={handleRegister}
                data={registerData}
                isDisabled={() => isDisabled(registerData)}
                setData={handleInputRegister}
              />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        </div>
        <div className='w-2/4 flex justify-center'>
          <img
            src={linus}
            alt='the perfect dog'
            className=' rounded-full h-24 w-24 sm:h-64 sm:w-64'
          />
        </div>
      </div>
    </div>
  );
};
function App() {
  return (
    <Switch>
      <Route path='/auth'>
        <AuthPage />
      </Route>
      <AuthorizedRoute exact path='/'>
        <AuthorizedLayout />
      </AuthorizedRoute>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
