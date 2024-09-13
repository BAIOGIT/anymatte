import React, { useState, useContext } from 'react';
import AuthContext from '../../../../../context/AuthContext';

import { useDispatch } from 'react-redux';
import { hideAllPanels } from '../../../../../redux/actions';

function RegisterEmail() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the provided username or default to the email
    const finalUsername = username.trim() ? username : email;

    registerUser(email, finalUsername, password, password2);
    
    dispatch(hideAllPanels());
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="text-sm  dark:text-gray-200 dark:text-gray-200 p-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-2">
          <label className="text-sm  dark:text-gray-200 p-1" htmlFor="username">
            Username (optional)
          </label>
          <input
            type="text"
            id="username"
            className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-2">
          <label className="text-sm  dark:text-gray-200 p-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-8">
          <label className="text-sm  dark:text-gray-200 p-1" htmlFor="password2">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
            placeholder="Confirm Password"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
        </div>
        <div className="mb-6">
          <button
            className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterEmail;
