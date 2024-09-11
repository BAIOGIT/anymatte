// components/ui/button.js
import React from 'react';

const Button = ({ type = 'button', className = '', children, ...props }) => {
  return (
    <button
      type={type}
      className={`bg-lightTheme-primary text-black hover:bg-darkTheme-primary hover:text-white dark:bg-darkTheme-primary dark:text-white dark:hover:bg-lightTheme-primary dark:hover:text-black px-4 py-3 rounded-md font-bold ring-2 ring-black dark:ring-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
