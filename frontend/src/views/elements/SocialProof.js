import React from 'react';
import { componentsHeadings } from '../contents'; // Import the headings object

import { Card, CardContent } from '../components/ui/card';
import Avatar, { AvatarFallback, AvatarImage } from '../components/ui/avatar';

const SocialProofSection = () => {
  // Destructure heading value from componentsHeadings
  const { title, testimonials } = componentsHeadings.SocialProofSection;

  return (
    <section id="testimonials" className="pb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))}</h2> {/* Use the title from componentsHeadings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-[1px] border-zinc-500">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-black dark:text-white">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
