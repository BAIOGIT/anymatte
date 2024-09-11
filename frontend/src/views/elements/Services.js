import React, { useState } from 'react';
import { FaBusinessTime, FaUserTie } from 'react-icons/fa';

import { componentsHeadings } from '../contents';

import ImageCustomers from '../../assets/images/customers.jpg';

import UI_List from '../components/UI_List';
import Button from '../components/ui/button';
import Parallax from '../components/ui/parallax'; // Import the Parallax component

function ServicesSection() {
  const [maximizedCard, setMaximizedCard] = useState(null);

  const handleCardClick = (card) => {
    setMaximizedCard(maximizedCard === card ? null : card);
  };

  const height = "1200px";

  const { title1, subtitle1, icon1, title2, subtitle2, icon2, title3, subtitle3, icon3, title4, subtitle4, icon4 } = componentsHeadings.ServicesSection;

  return (
    <section id='services' className="relative grid-section px-4 pb-20">
      <Parallax image={ImageCustomers} height={height}>
        <div className={`z-10 flex flex-col sm:flex-row justify-center items-center min-h-[${height}] w-full`}>
          {/* Left Grid Item */}
          <div
            className={`relative z-10 bg-gradient-to-r from-orange-500 to-transparent text-white p-6 flex flex-col justify-center text-center cursor-pointer transition-all duration-500 ease-in-out min-h-[${height}] ${
              maximizedCard === 'b2b'
                ? 'w-full md:w-full absolute inset-0 z-20 px-6'
                : 'w-full sm:w-1/2'
            }`}
            onClick={() => handleCardClick('b2b')}
          >
            {maximizedCard === 'b2b' && (
              <div className="flex flex-col items-center transition-opacity duration-1000 ease-in-out">
                <h3 className="text-6xl font-bold mb-4">{title1}</h3>
                <p className="text-3xl mb-4">
                  {subtitle1}
                </p>
                <UI_List
                  mode="lite"
                  icon1={icon1}
                  title1={title1}
                  subtitle1={subtitle1}
                  icon2={icon2}
                  title2={title2}
                  subtitle2={subtitle2}
                  icon3={icon3}
                  title3={title3}
                  subtitle3={subtitle3}
                  icon4={icon4}
                  title4={title4}
                  subtitle4={subtitle4}
                />
                <p className="text-xl mt-4">
                  {subtitle1}
                </p>
              </div>
            )}
            {maximizedCard !== 'b2b' && (
              <div className="flex flex-col items-center justify-between h-full">
                <h3 className="text-4xl font-bold mb-4">B2B</h3>
                <FaBusinessTime className="text-8xl" />
                <Button
                  type="submit"
                  className="my-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the parent div's onClick
                    handleCardClick('b2b'); // Expand the card
                  }}
                >
                  {componentsHeadings.ServicesSection.title1}
                </Button>
              </div>
            )}
          </div>

          {/* Right Grid Item */}
          <div
            className={`relative z-10 bg-gradient-to-l from-orange-500 to-transparent text-white p-6 flex flex-col justify-center text-center cursor-pointer transition-all duration-500 ease-in-out min-h-[${height}] ${
              maximizedCard === 'b2c'
                ? 'w-full md:w-full absolute inset-0 z-20 px-6'
                : 'w-full sm:w-1/2'
            }`}
            onClick={() => handleCardClick('b2c')}
          >
            {maximizedCard === 'b2c' && (
              <div className="flex flex-col items-center transition-opacity duration-1000 ease-in-out">
                <h3 className="text-6xl font-bold mb-4">{componentsHeadings.ServicesSection.title2}</h3>
                <p className="text-3xl mb-4">
                  {componentsHeadings.ServicesSection.subtitle2}
                </p>
                <UI_List
                  mode="lite"
                  icon1={icon1}
                  title1={title1}
                  subtitle1={subtitle1}
                  icon2={icon2}
                  title2={title2}
                  subtitle2={subtitle2}
                  icon3={icon3}
                  title3={title3}
                  subtitle3={subtitle3}
                  icon4={icon4}
                  title4={title4}
                  subtitle4={subtitle4}
                />
                <p className="text-xl mt-4">
                  {componentsHeadings.ServicesSection.subtitle2}
                </p>
              </div>
            )}
            {maximizedCard !== 'b2c' && (
              <div className="flex flex-col items-center justify-between h-full">
                <h3 className="text-4xl font-bold mb-4">B2C</h3>
                <FaUserTie className="text-8xl" />
                <Button
                  type="submit"
                  className="my-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the parent div's onClick
                    handleCardClick('b2c'); // Expand the card
                  }}
                >
                  {componentsHeadings.ServicesSection.title2}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Parallax>
    </section>
  );
}

export default ServicesSection;