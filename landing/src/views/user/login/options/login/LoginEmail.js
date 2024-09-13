import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../../context/AuthContext';

import { useDispatch, useSelector } from 'react-redux';
import { setLoginMethod, resetLoginMethod, hideAllPanels } from '../../../../../redux/actions';

function LoginEmail() {
    const dispatch = useDispatch();
    const { loginUser } = useContext(AuthContext);
  
    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.identifier.value;
        const password = e.target.password.value;
    
        username.length > 0 && loginUser(username, password);
      
        dispatch(hideAllPanels());
    };
  
  return (
    <>
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label
                        className="text-sm font-thin dark:text-gray-200 p-1"
                        htmlFor="form2Example17"
                    >
                        Email or Username
                    </label>
                    <input
                        type="text"
                        id="form2Example17"
                        className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
                        name="identifier"
                        placeholder="Email or Username"
                    />
                </div>
                <div className="mb-2">
                    <label
                        className="text-sm font-thin dark:text-gray-200 p-1"
                        htmlFor="form2Example27"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="form2Example27"
                        className="block w-full px-4 py-3 mt-1 rounded-lg bg-gray-200 focus:outline-none focus:bg-white dark:text-black"
                        name="password"
                        placeholder="Password"
                    />
                    <a
                        href="#!"
                        className="text-sm font-medium text-blue-400 underline underline-offset-2 block mb-5 ml-1 mt-3"
                    >
                        Forgot your password?
                    </a>
                </div>
                <div className="mb-6">
                    <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary  hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary"
                        type="submit"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    </>
  );
}

export default LoginEmail;

