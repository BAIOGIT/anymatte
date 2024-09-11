import React from 'react';

import { componentsHeadings } from '../contents';


// Unique Value Proposition (UVP) Section
function UVPSection() {
  const { title, subtitle } = componentsHeadings.UVPSection;

  return (
    <section id='uvp' className="uvp-section text-center py-12 px-8 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))}
      </h2>
      <p className="text-lg md:text-xl max-w-3xl mx-auto">
        {subtitle.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== subtitle.split('<br />').length - 1 && <br />}
          </span>
        ))}
      </p>
    </section>
  );
}

export default UVPSection;