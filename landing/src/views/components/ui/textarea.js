// components/ui/textarea.js
import React from 'react';

const Textarea = ({ placeholder = '', rows = 4, className = '', ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Textarea;
