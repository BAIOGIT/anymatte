

import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { footerHeadings } from '../contents';

function Footer() {
  return (
    <footer className="bg-lightTheme-primary dark:bg-darkTheme-primary text-center text-sm border-t-[1px] border-lightTheme-separator dark:border-darkTheme-separator">
        
      <div className="container mx-auto px-12 py-12">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-36 lg:gap-48">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold mb-4">{footerHeadings.companyInfo.title}</h3>
              <p className="mb-4">{footerHeadings.companyInfo.description}</p>
              <div className="flex justify-center sm:justify-start space-x-4 items-center">
                <Facebook className="h-6 w-6" />
                <Instagram className="h-6 w-6" />
                <Twitter className="h-6 w-6" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold mb-4">{footerHeadings.contact.title}</h4>
              <ul className="space-y-1">
                {footerHeadings.contact.contacts.map((contact, index) => (
                  <p>{contact.name}: {contact.value}</p>
                ))}
              </ul>
              {/* <p>Email: {footerHeadings.contact.email}</p>
              <p>Telefono: {footerHeadings.contact.phone}</p>
              <p>Indirizzo: {footerHeadings.contact.address}</p> */}
            </div>
            <div className="text-center sm:text-left flex flex-col sm:block items-center">
              <h4 className="text-lg font-semibold mb-4">{footerHeadings.quickLinks.title}</h4>
              <ul className="space-y-0 sm:space-y-1 space-x-6 sm:space-x-0 flex flex-row sm:flex-col">
                {footerHeadings.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="hover:underline text-sm underline-offset-4">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
        
      <div className="text-lightTheme-text dark:text-darkTheme-text py-3 border-t-[1px] border-lightTheme-separator dark:border-darkTheme-separator">
        {footerHeadings.copyright.text}
        <a
            href={footerHeadings.copyright.link.href}
            className="text-lightTheme-text dark:text-darkTheme-text font-semibold ml-1"
        >
            {footerHeadings.copyright.link.name}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
