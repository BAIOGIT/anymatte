import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    applyTheme();
  }, [isDarkMode]);

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // default to light mode if no saved mode found
  }

  function applyTheme() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleMode() {
    setIsDarkMode(prevMode => !prevMode);
  }

  return (
    <div className="flex items-center justify-center dark:bg-darkTheme-primary bg-lightTheme-primary">
      <button
        onClick={toggleMode}
        className={`relative ${
          isDarkMode ? '' : ' '
        } w-[62px] h-auto rounded-full duration-300 ease-in-out border-[2px] border-palette-gradientPrimary flex items-center justify-start`}
      >
        <div
          className={`w-6 h-6 m-1 rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${
            isDarkMode ? 'translate-x-full bg-gradient-to-tl from-palette-gradientSecondary to-palette-gradientPrimary  hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary' : 'translate-x-0 bg-gradient-to-tl from-palette-gradientSecondary to-palette-gradientPrimary  hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary'
          }`}
        >
          {isDarkMode ? (
            <i className={`fas fa-moon text-white`}></i>
          ) : (
            <i className={`fas fa-sun text-white`}></i>
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
