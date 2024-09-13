import React from 'react';

const Button = ({ type = 'button', className = '', children, disabled = false, ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-3 rounded-md font-bold ring-2 ring-black dark:ring-white 
        ${disabled 
          ? 'bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white'
          : 'bg-lightTheme-primary text-black hover:bg-darkTheme-primary hover:text-white dark:bg-darkTheme-primary dark:text-white dark:hover:bg-lightTheme-primary dark:hover:text-black'
        } 
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
