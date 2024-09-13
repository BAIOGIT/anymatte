import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Assuming AuthProvider is used somewhere

import UI_List from './views/components/UI_List';
import Navbar from './views/components/Navbar';
import Footer from './views/components/Footer';
import LandingPage from './views/LandingPage';
import FileManager from './views/user/FileManager';

import CloseTab from './utils/CloseTab';

import { Scrollbars } from "react-custom-scrollbars-2";

import jwtDecode from "jwt-decode"
import ProtectedRoute from './utils/ProtectedRoute';

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

function App() {
  return (
    <div className="bg-lightTheme-primary text-black dark:bg-darkTheme-primary dark:text-white h-full">
      {/* Uncomment and configure Scrollbars if needed */}
      {/* <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: '#424242',
              borderRadius: '8px',
              width: '4px'
            }}
          />
        )}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: '#888',
              borderRadius: '8px',
            }}
          />
        )}
        style={{ height: 1800 }}
      > */}

        {/* <Router> */}
          <Navbar className="z-1000" />

          <Routes>

            <Route path="/" element={<LandingPage />} />

            <Route
              path="/file-manager"
              element={<ProtectedRoute element={<FileManager />} />}
            />
            
            <Route path="/payment-successful" element={<CloseTab />} />
            <Route path="/cancel" element={<CloseTab />} />

          </Routes>

          <Footer />
        {/* </Router> */}

      {/* </Scrollbars> */}
    </div>
  );
}

export default App;
