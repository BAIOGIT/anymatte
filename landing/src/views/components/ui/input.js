// components/ui/input.js
import React from 'react';

const Input = ({ type = 'text', placeholder = '', className = '', ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
