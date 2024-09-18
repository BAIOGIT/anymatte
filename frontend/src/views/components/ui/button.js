import React from 'react';

const Button = ({ type = 'button', className = '', children, disabled = false, ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-3 rounded-md font-bold ring-2 ring-black dark:ring-white 
        ${disabled 
          ? 'bg-lightTheme-primary dark:bg-darkTheme-primary text-lightTheme-text dark:text-darkTheme-text opacity-40'
          : 'bg-lightTheme-primary text-lightTheme-text hover:bg-darkTheme-primary hover:text-darkTheme-text dark:bg-darkTheme-primary dark:text-darkTheme-text dark:hover:bg-lightTheme-primary dark:hover:text-lightTheme-text'
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
