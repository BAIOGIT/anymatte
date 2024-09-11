import React from 'react';
import { componentsHeadings } from '../contents'; // Import the headings object

// Call to Action Section
function CallToActionSection() {
  // Destructure the relevant data from componentsHeadings
  const { title, subtitle, button } = componentsHeadings.CallToActionSection; // Assuming you want to use the BenefitsSection data

  return (
    <section id='cta' className="cta-section bg-lightTheme-secondary dark:bg-darkTheme-secondary text-white dark:text-black text-center py-24 px-8 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))} {/* Use the title from componentsHeadings */}
      </h2>
      <p className="text-xl md:text-xl max-w-2xl mx-auto mb-8">
        {subtitle.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== subtitle.split('<br />').length - 1 && <br />}
          </span>
        ))} {/* Use the subtitle from componentsHeadings */}
      </p>
      <a href="#upload" className="bg-white text-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black font-bold py-3 px-8 rounded-md text-lg shadow-lg transition duration-300 ease-in-out ring-2 ring-white dark:ring-black">
        {button}
      </a>
    </section>
  );
}

export default CallToActionSection;
