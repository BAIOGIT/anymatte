
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginPanel, showRegisterPanel, showPricingPanel, hideAllPanels, resetUploadPermission, storeUploadCount, storeUploadMaxCount } from '../../redux/actions';

import AuthContext from '../../context/AuthContext'
import jwtDecode from "jwt-decode"
import { Link, useHistory } from 'react-router-dom'

import ThemeToggle from './ThemeToggle';
import Login from '../user/login/Login';

import BuyCredits from '../user/BuyCredits';

import Pricing from '../elements/Pricing';

const Navbar = () => {
  const dispatch = useDispatch();

  const { showLoginPanel: isLoginPanelVisible, showRegisterPanel: isRegisterPanelVisible, showPricingPanel: isPricingPanelVisible } = useSelector(state => state.ui);

  const uploadMode = useSelector((state) => state.upload.uploadMode);
  const uploadCount = useSelector((state) => state.upload.uploadCount);
  const uploadMaxCount = useSelector((state) => state.upload.uploadMaxCount);

  const {user, logoutUser} = useContext(AuthContext)

  const handleLogout = async () => {
    dispatch(resetUploadPermission());
    await logoutUser();
  };

  const handleShowLogin = () => {
    dispatch(showLoginPanel());
  };

  const handleShowPricing = () => {
    dispatch(showPricingPanel());
  };

  const handleClosePanels = () => {
    dispatch(hideAllPanels());
  };

  const token = localStorage.getItem("authTokens")
        
  if (token) {
    try {
      const decode = jwtDecode(token);
      // // DEBUG --> console.log("Decoded token:", decode); // Inspect the decoded token
      var user_id = decode.id;
      var username = decode.username;
      var email = decode.email;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }  

  return (
    <>
      <nav className="z-10 bg-lightTheme-primary dark:bg-darkTheme-primary border-b-[1px] border-lightTheme-separator dark:border-darkTheme-separator w-full">
        <div className="p-6 py-2">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              
              <Link to="/">
                <img className="h-8 w-auto" src="/logo_navbar.png" alt="Logo" />
              </Link>

            </div>  
            <div className="flex items-center">

              <div className="ml-4 flex flex-row items-center space-x-4">   

                <div className="">
                  {/* <a href="/#examples" className=" hover:bg-gradient-to-br hover:from-palette-gradientPrimary hover:to-palette-gradientSecondary hover:text-white px-3 py-3 rounded-md text-sm font-medium">Examples</a> */}
                  {/* <button 
                    className="mx-0 sm:mx-1 hover:bg-gradient-to-br hover:from-palette-gradientPrimary hover:to-palette-gradientSecondary hover:text-white px-3 py-3 rounded-md text-sm font-medium"
                    onClick={handleShowPricing}
                  >          
                    <a className="px-2 sm:px-0">Pricing</a>     
                  </button> */}
                  <button 
                    className="hidden sm:inline mx-1 hover:bg-gradient-to-br hover:from-palette-gradientPrimary hover:to-palette-gradientSecondary hover:text-white px-3 py-3 rounded-md text-sm font-medium"
                  >                          
                    <a href="/#contact" className="px-2 sm:px-0">Contact</a>
                  </button>
                  {/* <button 
                    className="hidden sm:inline mx-1 hover:bg-gradient-to-br hover:from-palette-gradientPrimary hover:to-palette-gradientSecondary hover:text-white px-3 py-3 rounded-md text-sm font-medium"
                  >                          
                    <a href="/#benefits" className="px-2 sm:px-0">FAQ</a>
                  </button> */}
                  
                </div> 

                {/* {token !== null && (
                  <>
                    <Link to="/file-manager" className="bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary hover:from-palette-gradientPrimary hover:to-palette-gradientPrimary mt-2 px-3 py-2 rounded-md text-sm font-medium w-42 text-white mb-2">File Manager</Link>
                  </>
                )} */}

                { token && (
                  <BuyCredits />
                )}
                
                <ThemeToggle />

                {/* {token !== null ? (
                  <>
                    <div className="border-black dark:border-white dark:hover:border-palette-gradientPrimary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium border-[1px] hover:text-white hover:border-palette-gradientPrimary dark:hover:text-black dark:border-zinc-300 dark:text-white text-center font-semibold hover:bg-gradient-to-tl hover:from-palette-gradientSecondary hover:to-palette-gradientPrimary focus:outline-none focus:ring-2 focus:ring-palette-gradientPrimary focus:ring-offset-2">
                      <button 
                        className="flex items-center w-full"
                        onClick={handleLogout}
                      >                          
                        <i className='fas fa-user mr-2'></i>
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border-black dark:border-white dark:hover:border-palette-gradientPrimary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium border-[1px] hover:text-white hover:border-palette-gradientPrimary dark:hover:text-black dark:border-zinc-300 dark:text-white text-center font-semibold hover:bg-gradient-to-tl hover:from-palette-gradientSecondary hover:to-palette-gradientPrimary focus:outline-none focus:ring-2 focus:ring-palette-gradientPrimary focus:ring-offset-2">
                    <button 
                      className="flex items-center w-full"
                      onClick={handleShowLogin}
                    >                          
                      <i className='fas fa-user mr-2'></i>
                      Login
                    </button>
                  </div>
                )} */}

              </div>
            </div>
          </div>
        </div>
          <div className='border-t-[1px] border-lightTheme-separator dark:border-darkTheme-separator w-full'>   

            {token !== null && (
              <div className="py-2 text-center flex flex-col items-center">
                
                  {username.includes('@') && username.includes('.') ? (
                    // If it's an email, display it as is
                    <span className='font-bold'>Welcome, {username}!</span>
                  ) : (
                    // Otherwise, capitalize the first letter of the username
                    <span className='font-bold'>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}!</span>
                  )}

                  {uploadMode === 'trial' && (
                    <div className='text-sm font-thin'>
                      You have {uploadMaxCount - uploadCount}/{uploadMaxCount} trials left.
                    </div>
                  )}
                  {uploadMode === 'credits' && (
                    <div className='text-sm font-thin'>
                      You have {uploadMaxCount} credits left.
                    </div>
                  )}
                  {uploadMode === 'subscription' && (
                    <div className='text-sm font-thin'>
                      You have unlimited uploads with your subscription.
                    </div>
                  )}
                  {uploadMode === 'empty' && (
                    <div className='text-sm font-thin'>
                      You cannot upload right now. Please check your account status.
                    </div>
                  )}
                  
              </div>
            )}
          </div>
      </nav>          

      {token !== null && (
        <div className="text-center flex flex-col items-center">
          <Link to="/file-manager" className="bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary hover:from-palette-gradientPrimary hover:to-palette-gradientPrimary mt-2 px-4 py-3 rounded-md text-sm font-medium w-42 text-white mb-2">File Manager</Link>
        </div>
      )}

      {(isLoginPanelVisible || isRegisterPanelVisible) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Login />
        </div>
      )}

      {isPricingPanelVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Pricing />
        </div>
      )}
    </>
  );
};

export default Navbar;
