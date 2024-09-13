import React, { useState } from 'react';
import useAxios from '../../utils/useAxios';
import { StripePopupTrigger } from '../../utils/StripePopup';
import jwtDecode from 'jwt-decode';
import Button from '../components/ui/button';

const BuyCredits = () => {
    const axios = useAxios();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [paymentUuid, setPaymentUuid] = useState(null);

    // Retrieve user info from the JWT token
    let user_id, username, email;
    const token = localStorage.getItem('authTokens');

    if (token) {
        try {
        const decode = jwtDecode(token);
        user_id = decode.id;
        username = decode.username;
        email = decode.email;
        } catch (error) {
        console.error('Failed to decode token:', error);
        }
    }

    // Function to open the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();    
        // Open the payment popup first
        if ( token ) {
            openPopup();
        }
    };

    const quantity = 3;

    // Create a Stripe Checkout session
    const handleBuyCredits = async () => {
        try {        
            const response = await axios.post('/add-credit/', {
                user_id: user_id,
                quantity: quantity,
            });
            window.location.reload();
            
        } catch (error) {
            console.error('Error adding credits:', error);
        }
    };

    return (
        <div>
            <div className="border-black dark:border-white dark:hover:border-palette-gradientPrimary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium border-[1px] hover:text-white hover:border-palette-gradientPrimary dark:hover:text-black dark:border-zinc-300 dark:text-white text-center font-semibold hover:bg-gradient-to-tl hover:from-palette-gradientSecondary hover:to-palette-gradientPrimary focus:outline-none focus:ring-2 focus:ring-palette-gradientPrimary focus:ring-offset-2">
                <button 
                className="flex items-center w-full"
                onClick={handleSubmit}
                >                          
                    {/* <i className='fas fa-user mr-2'></i> */}
                    <span className="whitespace-nowrap">
                        Buy credits
                    </span>
                </button>
            </div>

            {token && isPopupOpen && (
                <StripePopupTrigger reason='credit' mode='payment' price_id='price_1Pv5xPJ0wDsD9vPN8naixMhK' quantity={quantity} onPaymentSuccess={handleBuyCredits} onClose={closePopup} />
            )}
        </div>
    );
};

export default BuyCredits;
