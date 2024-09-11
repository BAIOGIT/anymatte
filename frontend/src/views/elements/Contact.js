import React, { useState } from 'react';
import { componentsHeadings } from '../contents'; // Import the headings object

import useAxios from '../../utils/useAxios';

import Button from '../components/ui/button';
import Input from '../components/ui/input';
import Textarea from '../components/ui/textarea';

const ContactSection = () => {
  const axios = useAxios();

  const { title, subtitle, name, email, subject, message, button } = componentsHeadings.ContactSection;

  const [formData, setFormData] = useState({
    user: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/request/`, formData, {
        headers: {
          'Content-Type': 'application/json',  // Set content type as JSON
        }
      });

      // DEBUG --> console.log(response);
      

      if (response.status == 201) {
        alert('Message sent successfully!');
        setFormData({ user: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-8 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== title.split('<br />').length - 1 && <br />}
          </span>
        ))} {/* Use the title from componentsHeadings */}
        </h2>
        <p className="text-lg text-center mb-8">
          {subtitle.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index !== subtitle.split('<br />').length - 1 && <br />}
          </span>
        ))} {/* Use the subtitle from componentsHeadings */}
        </p>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <Input
                placeholder={name}
                className="border-[2px] border-black dark:border-white bg-lightTheme-primary bg-darkTheme-primary placeholder-black dark:placeholder-gray-700"
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
              <Input
                placeholder={email}
                className="border-[2px] border-black dark:border-white bg-lightTheme-primary bg-darkTheme-primary placeholder-black dark:placeholder-gray-700"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <Input
              placeholder={subject}
              className="border-[2px] border-black dark:border-white bg-lightTheme-primary bg-darkTheme-primary placeholder-black dark:placeholder-gray-700"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <Textarea
              placeholder={message}
              rows={5}
              className="border-[2px] border-black dark:border-white bg-lightTheme-primary bg-darkTheme-primary placeholder-black dark:placeholder-gray-700"
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              {button}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
