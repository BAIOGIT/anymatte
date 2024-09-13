import React from 'react';

import { componentsHeadings } from '../contents';

import UI_List  from '../components/UI_List';

// Benefits Section
function BenefitsSection() {
  const { title, title1, subtitle1, icon1, title2, subtitle2, icon2, title3, subtitle3, icon3, title4, subtitle4, icon4 } = componentsHeadings.BenefitsSection;

  return (
    <section id='benefits' className="benefits-section text-center py-24 px-8 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
      {title.split('<br />').map((line, index) => (
                    <span key={index}>
                        {line}
                        {index !== title.split('<br />').length - 1 && <br />}
                    </span>
                ))}        
      </h2>
      <UI_List
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
    </section>
  );
}

export default BenefitsSection;