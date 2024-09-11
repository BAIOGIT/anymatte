import React from 'react';

import { componentsHeadings } from '../contents';

import ImagePotatura from '../../assets/images/sections/giardino/potatura/potatura.jpg';
import Parallax from '../components/ui/parallax';

import VideoUpload from '../components/tools/VideoUpload';


// Hero Section
function HeroSection() {
  const { title, subtitle } = componentsHeadings.HeroSection;

    return (
      <section id='upload' className="hero-section relative text-center text-lightTheme-text dark:text-darkTheme-text mt-20 px-8 md:px-12">
        {/* Background image */}
        {/* <Parallax height="800px"> */}
          {/* Gradient overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-l from-orange-800 via-transparent to-orange-500 opacity-100"></div> */}
          {/* Content on top of the image and gradient */}
          <div className="">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))}
            </h1>
            <p className="text-lg md:text-xl mt-4">
              {subtitle.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== subtitle.split('<br />').length - 1 && <br />}
          </span>
        ))}
            </p>
            {/* <button className="mt-8 bg-gradient-to-tl from-orange-700 to-orange-500 hover:from-orange-700 hover:to-orange-700 text-white px-6 py-4 rounded-full focus:outline-none focus:bg-orange-600 font-bold transition duration-300 ease-in-out">
              Scarica la versione Beta
            </button> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
              <VideoUpload />
          </div>
        {/* </Parallax>   */}
      </section>
    );
  }

export default HeroSection;