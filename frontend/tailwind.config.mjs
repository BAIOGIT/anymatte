import { appearanceScheme } from './src/views/contents';

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Must match w/ imported { appearanceScheme } from './src/views/contents';
      // --- START OF MATCH ---
      colors: {
        palette: {
          'primary': appearanceScheme.colors.palette.primary,
          'secondary': appearanceScheme.colors.palette.secondary,
          'alt': appearanceScheme.colors.palette.alt,
          'gradientPrimary': appearanceScheme.colors.palette.gradientPrimary,
          'gradientSecondary': appearanceScheme.colors.palette.gradientSecondary,
          'gradientLight': appearanceScheme.colors.palette.gradientLight,
          
        },
        lightTheme: {
          'primary': appearanceScheme.colors.lightTheme.primary,
          'secondary': appearanceScheme.colors.lightTheme.secondary,
          'alt': appearanceScheme.colors.lightTheme.alt,
          'separator' : appearanceScheme.colors.lightTheme.separator,
          'text' : appearanceScheme.colors.lightTheme.text,
        },
        darkTheme: {
          'primary': appearanceScheme.colors.darkTheme.primary,
          'secondary': appearanceScheme.colors.darkTheme.secondary,
          'alt': appearanceScheme.colors.darkTheme.alt,
          'separator' : appearanceScheme.colors.darkTheme.separator,
          'text' : appearanceScheme.colors.darkTheme.text,
        },
      },
      fontFamily: {
        lightTheme: appearanceScheme.fontFamily.lightTheme,
        darkTheme: appearanceScheme.fontFamily.darkTheme,
      },
      // --- END OF MATCH ---
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}