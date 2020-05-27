import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './assets/main.css';
import AuthorizedRoute from './utils/AuthorizedRoute';
import linus from './images/linus.jpg';
import Form from './components/Form';
const AuthorizedLayout = () => <h1>ho</h1>;

const LoginPage = () => {
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
  const printA = (e) => {
    e.preventDefault();
    console.log('A');
  };
  const printB = (e) => {
    e.preventDefault();
    console.log('B');
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
                  activeClassName=' border-solid border-2 p-2 border-blue-400'
                  className='px-10 text-gray-100'
                  to='/auth/login'
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
            <Route path='/auth/login'>
              <Form
                titleBtn='Login'
                OnSubmit={printA}
                data={loginData}
                isDisabled={() => isDisabled(loginData)}
                setData={handleInputLogin}
              />
            </Route>
            <Route path='/auth/register'>
              <Form
                titleBtn='Register'
                OnSubmit={printB}
                data={registerData}
                isDisabled={() => isDisabled(registerData)}
                setData={handleInputRegister}
              />
            </Route>
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
    <BrowserRouter>
      <Switch>
        <Route path='/auth'>
          <LoginPage />
        </Route>
        <AuthorizedRoute exact path='/'>
          <AuthorizedLayout />
        </AuthorizedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
