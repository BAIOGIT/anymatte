import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useAxios from './useAxios';

import { useDispatch, useSelector } from 'react-redux';
import { setUploadUuid } from '../redux/actions';

export const StripePopupTrigger = ({ reason, mode, price_id, quantity, onPaymentSuccess, onClose }) => {
  const axios = useAxios();

  const dispatch = useDispatch();

  const handleClick = async () => {
    const uniqueSessionId = uuidv4(); // Generate a unique identifier
    dispatch(setUploadUuid(uniqueSessionId));
    
    try {
      const response = await axios.post(`/create-checkout-session/`, {
        uniqueSessionId: uniqueSessionId, // Unique identifier for the payment session
        reason: reason,
        mode: mode, // This seems to be a placeholder; make sure it's the correct field
        price_id: price_id, // Stripe price ID or similar
        quantity: quantity
      });
      const { checkoutUrl } = response.data;

      // Open Stripe Checkout in a new tab
      const newWindow = window.open(checkoutUrl, '_blank');

      // Check periodically if the new window is closed
      const checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowClosed);
          // Check payment status on the server
          axios.get(`/check-payment-status/`, { params: { uniqueSessionId } })
            .then((statusResponse) => {              
              if (statusResponse.data.paid == 'success') {
                onClose();
                onPaymentSuccess();
              } else {
                console.error('Payment not completed');
              }
            })
            .catch((error) => console.error('Error checking payment status:', error));
        }
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 px-2">
      <div className="bg-lightTheme-primary dark:bg-darkTheme-primary p-24 rounded shadow-lg relative border border-lightTheme-separator dark:border-darkTheme-separator">     

        <button
          onClick={onClose}
          className="absolute top-0 right-0 px-3 py-1 mr-2 mt-2 font-medium text-xl bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary border-2 border-black dark:border-white transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl sm:text-2xl font-bold leading-tight mb-2">
          Complete Your Purchase
        </h2>
        <p className="text-xl sm:text-xl mb-6">
          Complete Your Purchase
        </p>
        <p className="text-md sm:text-lg mb-6 animate-pulse">
          Do not close this window during payment process
        </p>
        <button
            type="button"
            onClick={handleClick}
            className="bg-gradient-to-br hover:bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-500 text-sm font-bold py-3 px-5 rounded transition text-white"
        >
            Pay with Stripe
        </button>

      </div>
    </div>
  );
};


export default { StripePopupTrigger };
