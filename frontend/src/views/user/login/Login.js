import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLoginMethod, resetLoginMethod, hideAllPanels } from '../../../redux/actions';
import AuthContext from '../../../context/AuthContext';
import LoginEmail from './options/login/LoginEmail';
import LoginGoogle from './options/login/LoginGoogle';
import RegisterEmail from './options/register/RegisterEmail';
import RegisterGoogle from './options/register/RegisterGoogle';

import Button from '../../components/ui/button';

import { componentsHeadings } from '../../contents';

function Login() {
  const { title, subtitle } = componentsHeadings.LoginSection;

  const { loginUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const location = useLocation();
  const loginMethod = useSelector(state => state.login.loginMethod);

  const [isFloating, setIsFloating] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    dispatch(resetLoginMethod());
  }, [location.state, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length > 0) {
      loginUser(email, password);
    }
  };

  const toggleFloating = () => {
    setIsFloating(!isFloating);
  };

  const handleClose = () => {
    dispatch(hideAllPanels());
    setIsRegistering(false); // Close the registration panel if it's open
    dispatch(setLoginMethod(''));
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
    setIsFloating(true); // Ensure the panel is floating
    dispatch(setLoginMethod(''));
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen px-2">
      <div className="relative w-full max-w-md p-8 mx-auto bg-lightTheme-primary dark:bg-darkTheme-primary border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform-gpu">
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 px-3 py-1 mr-2 mt-2 font-medium text-xl bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mt-6 mb-2 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== subtitle.split('<br />').length - 1 && <br />}
          </span>
        ))}
          </p>
        </div>
        {/* <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {isRegistering ? 'Registrati to Swell' : 'Login a Swell'}
          </h3>
        </div> */}
        {!isRegistering && (
          <>
            {loginMethod !== 'email' ? (
              <div className="space-y-4 mb-6">
                <Button 
                  className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-lightTheme-primary w-full"
                  onClick={() => dispatch(setLoginMethod('email'))}
                >
                  Sign-in with Email
                </Button>
                <Button 
                  className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-lightTheme-primary w-full"
                  onClick={() => dispatch(setLoginMethod('google'))}
                >
                  Continue with Google
                </Button>
              </div>
            ) : (
              <LoginEmail onSubmit={handleSubmit} />
            )}
            {loginMethod === 'google' && <LoginGoogle />}
          </>
        )}
        {isRegistering && (
          <>
            {loginMethod !== 'email' ? (
              <div className="space-y-4 mb-6">
                <Button 
                  className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-lightTheme-primary w-full"
                  onClick={() => dispatch(setLoginMethod('email'))}
                >
                  Sign-up with Email
                </Button>
                <Button 
                  className="mt-4 bg-gray-200 text-black font-medium py-2 px-6 rounded hover:bg-lightTheme-primary w-full"
                  onClick={() => dispatch(setLoginMethod('google'))}
                >
                  Continue with Google
                </Button>
              </div>
            ) : (
              <RegisterEmail />
            )}
            {loginMethod === 'google' && <RegisterGoogle />}
          </>
        )}
        <div className="mt-6 text-center">
          <h5 className="font-semibold text-lg text-gray-600 dark:text-gray-300">
            {isRegistering ? "Already have an account?" : "Don' t have an account yet?"}
          </h5>
          <button
            onClick={handleRegisterToggle}
            className="w-full px-4 py-3 mt-3 rounded-lg  text-white bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary  hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary focus:outline-none transition-colors font-semibold hover:text-white"
          >
            {isRegistering ? 'Sign-in' : 'Sign-up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
