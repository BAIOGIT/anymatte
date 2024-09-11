// components/Parallax.js
import React from 'react';
import PropTypes from 'prop-types';

const Parallax = ({ image, height, children }) => {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    // height: height || '500px', // Default height if not provided
  };

  return (
    <div className={`relative w-full h-[${height}]`} style={style}>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

Parallax.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.string,
  children: PropTypes.node,
};

export default Parallax;
