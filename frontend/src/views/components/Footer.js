import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginPanel, showRegisterPanel, showPricingPanel, hideAllPanels, resetUploadPermission, storeUploadCount, storeUploadMaxCount } from '../../redux/actions';

import { Facebook, Instagram, Twitter } from 'lucide-react';

import { footerHeadings } from '../contents';

function Footer() {
  const dispatch = useDispatch();

  const { showLoginPanel: isLoginPanelVisible, showRegisterPanel: isRegisterPanelVisible, showPricingPanel: isPricingPanelVisible } = useSelector(state => state.ui);

  const handleShowPricing = () => {
    dispatch(showPricingPanel());
  };

  const handleClosePanels = () => {
    dispatch(hideAllPanels());
  };

  return (
    <footer className="bg-lightTheme-primary dark:bg-darkTheme-primary text-center text-sm border-t-[1px] border-lightTheme-separator dark:border-darkTheme-separator">
      <div className="container mx-auto px-12 py-12">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-36 lg:gap-48">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">{footerHeadings.companyInfo.title}</h3>
              <p className="mb-4">{footerHeadings.companyInfo.description}</p>
              <div className="flex justify-center space-x-4 items-center mb-2">
                <Facebook className="h-6 w-6" />
                <Instagram className="h-6 w-6" />
                <Twitter className="h-6 w-6" />
              </div>
              <ul className="space-y-1 mb-4">
                {footerHeadings.contact.contacts.map((contact, index) => (
                  <p key={index}>{contact.name} {contact.value}</p>
                ))}
              </ul>
            </div>
            <div className="text-center flex flex-col sm:block items-center">
              <h4 className="text-lg font-semibold mb-4">{footerHeadings.quickLinks.title}</h4>
              <ul className="space-y-0 sm:space-y-1 space-x-6 sm:space-x-0 flex flex-row sm:flex-col">
                {footerHeadings.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    {link.href ? (
                      <a href={link.href} className="hover:underline text-sm underline-offset-4">
                        {link.name}
                      </a>
                    ) : (
                      <button
                        onClick={handleShowPricing}
                        className="hover:underline text-sm underline-offset-4 bg-transparent border-none cursor-pointer"
                      >
                        {link.name}
                      </button>
                    )}
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
