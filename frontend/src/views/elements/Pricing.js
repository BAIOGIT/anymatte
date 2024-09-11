import React, { useState } from 'react';
import { pricingHeadings } from '../contents'; // Adjust the import path accordingly

import { useDispatch, useSelector } from 'react-redux';
import { hideAllPanels } from '../../redux/actions';

// Pricing Card Component
const PricingCard = ({ title, description, price, features }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform-gpu">
        {/* Content Area for Title, Description, Price, and Features */}
        <div className="flex-grow max-h-8">
            <h3 className="text-2xl font-semibold mb-2 text-center">{title}</h3>
            <p className="text-gray-600 mb-4 text-center">{description}</p>
            <div className="text-3xl font-bold text-blue-600 mb-6 text-center">{price}</div>
            <ul className="mb-6 space-y-2">
            {features.map((feature, index) => (
                <li key={index} className="text-gray-700 flex items-center justify-center">
                <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                    ></path>
                </svg>
                {feature}
                </li>
            ))}
            </ul>
        </div>
        
        {/* Button stays at the bottom */}
        <button className="w-full px-4 py-3 mt-3 rounded-lg  text-white bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary  hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary focus:outline-none transition-colors font-semibold hover:text-white">
            Select Plan
        </button>
        </div>
    );
};

// Main Pricing Component
const Pricing = () => {
    const dispatch = useDispatch();
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Pricing data for the three models
    const pricingPlans = [
        {
        title: pricingHeadings.oneTimePayment.title,
        description: pricingHeadings.oneTimePayment.description,
        price: pricingHeadings.oneTimePayment.price,
        features: pricingHeadings.oneTimePayment.features,
        },
        {
        title: pricingHeadings.subscription.title,
        description: pricingHeadings.subscription.description,
        price: pricingHeadings.subscription.price,
        features: pricingHeadings.subscription.features,
        },
        {
        title: pricingHeadings.studio.title,
        description: pricingHeadings.studio.description,
        price: pricingHeadings.studio.price,
        features: pricingHeadings.studio.features,
        },
    ];

    const handleClose = () => {
        dispatch(hideAllPanels());
        setSelectedPlan(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen px-2">
            <div className="relative w-full p-8 mx-auto bg-lightTheme-primary dark:bg-darkTheme-primary border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform-gpu">
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 px-3 py-1 mr-2 mt-2 font-medium text-xl bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="bg-gray-50 py-12 m-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Pricing Plans</h2>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard
                            key={index}
                            title={plan.title}
                            description={plan.description}
                            price={plan.price}
                            features={plan.features}
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
