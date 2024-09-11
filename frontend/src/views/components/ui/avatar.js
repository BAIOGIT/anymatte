import React from 'react';

const Avatar = ({ children, className }) => {
  return (
    <div className={`w-12 h-12 rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Avatar;

const AvatarImage = ({ src }) => {
    return <img src={src} alt="Avatar" className="w-full h-full object-cover" />;
  };
  
export { AvatarImage };

const AvatarFallback = ({ children }) => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-lg font-bold">
        {children}
      </div>
    );
  };
  
export { AvatarFallback };
  