import React, { useState } from 'react';
import { pricingHeadings } from '../contents'; // Adjust the import path accordingly

import { useDispatch, useSelector } from 'react-redux';
import { hideAllPanels } from '../../redux/actions';

const PricingCard = ({ title, description, price, features }) => {
    return (
        <div className=" bg-lightTheme-primary dark:bg-darkTheme-primary shadow-lg rounded-lg p-4 lg:p-6 border-[1px] border-lightTheme-separator dark:border-darkTheme-separator hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between dark:border-gray-700 transform-gpu max-h-[40vh] md:max-h-[60vh]">
            {/* Content Area for Title, Description, Price, and Features */}
            <div className="flex-grow">
                <h3 className="text-lg lg:text-2xl font-semibold mb-2 text-center">{title}</h3>
                <p className="text-black dark:text-white mb-4 lg:mb-6 text-sm lg:text-base text-center">{description}</p>
                <div className="text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4 lg:mb-6 text-center">{price}</div>
                <ul className="mb-4 lg:mb-6 space-y-1 lg:space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="text-black dark:text-white flex items-center justify-center text-sm lg:text-base">
                            <svg
                                className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-1 lg:mr-2"
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
            <button className="w-full px-3 py-2 lg:px-4 lg:py-3 mt-auto rounded-lg text-white bg-gradient-to-br from-palette-gradientPrimary to-palette-gradientSecondary hover:from-palette-gradientSecondary hover:to-palette-gradientSecondary focus:outline-none transition-colors font-semibold hover:text-white">
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
        <div className="flex items-center justify-center min-h-screen min-w-screen px-2 max-h-[60vh] lg:max-h-[50vh]">
            <div className="relative w-full p-8 mx-auto bg-lightTheme-primary dark:bg-darkTheme-primary border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform-gpu">
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 px-3 py-1 mr-2 mt-2 font-medium text-xl bg-lightTheme-primary dark:bg-darkTheme-primary text-black dark:text-white hover:text-white dark:hover:text-black rounded-md hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary ring-2 ring-black dark:ring-white transition-colors"
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="m-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl font-extrabold text-black dark:text-white mb-8">Our Pricing Plans</h2>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
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
