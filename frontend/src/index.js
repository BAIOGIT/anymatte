import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust path as needed

// import { ClerkProvider } from '@clerk/clerk-react'
// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY
// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Router>
            <AuthProvider>
                <Provider store={store}>
                    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
                        <App />
                    {/* </ClerkProvider> */}
                </Provider>
            </AuthProvider>
        </Router>
    </>
);
