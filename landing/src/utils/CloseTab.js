import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CloseTab = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Function to close the tab if opened by script, or redirect if not
    const closeOrRedirect = () => {
      if (window.opener) {
        // Tab was opened by another window (e.g., via window.open)
        window.close();
      } else {
        // If the page was not opened programmatically, redirect to another route
        console.warn('This tab cannot be closed programmatically. Redirecting...');
        navigate('/'); // Redirect to home page (or any other page you prefer)
      }
    };

    closeOrRedirect();
  }, [navigate]);

  return null; // No need to render anything
};

export default CloseTab;
