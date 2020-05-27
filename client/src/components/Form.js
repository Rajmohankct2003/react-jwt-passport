import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import uuid from 'uuid/v4';

let inputEmail = uuid();
let inputPassword = uuid();

const Form = ({ titleBtn, OnSubmit, data, setData, isDisabled }) => {
  const [isVisible, setVisibility] = useState(false);

  const ifDisabled = isDisabled();
  return (
    <form onSubmit={OnSubmit} className='flex flex-col p-12 bg-white  '>
      <label className='text-gray-700' htmlFor={`email-${inputEmail}`}>
        Email
      </label>
      <input
        name='email'
        id={`email-${inputEmail}`}
        value={data.email}
        onChange={setData}
        type='email'
        className='border outline-none border-gray-500 px-2 '
      />
      <label className='text-gray-700' htmlFor={`password-${inputPassword}`}>
        Password
      </label>
      <div className='flex relative items-center '>
        <input
          autocomplete='new-password'
          name='password'
          value={data.password}
          onChange={setData}
          id={`password-${inputPassword}`}
          type={isVisible ? 'text' : 'password'}
          className='border outline-none border-gray-500 w-full px-2'
        />
        <button
          type='button'
          onClick={() => setVisibility((prev) => !prev)}
          className='absolute right-0 -mr-6 focus:outline-none  '
        >
          {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
      <button
        type='submit'
        disabled={isDisabled()}
        className={`text-sm py-1 text-gray-100  my-4 rounded-sm ${
          ifDisabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'
        }`}
      >
        {titleBtn}
      </button>
      <div className='flex justify-center hover:text-gray-600'>
        <button
          type='button'
          onClick={() => console.log('clicked')}
          className='flex items-center justify-around w-3/5'
        >
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default Form;
