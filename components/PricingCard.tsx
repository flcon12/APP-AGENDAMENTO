
import React from 'react';

interface PricingCardProps {
    title: string;
    price: number;
    priceSubtitle: string;
    features: string[];
    highlight?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, priceSubtitle, features, highlight = false }) => {
    return (
        <div className={`bg-gray-900/50 p-8 rounded-lg border ${highlight ? 'border-red-600 shadow-lg shadow-red-600/10' : 'border-gray-700'}`}>
            <h3 className="text-3xl font-bold text-center">{title}</h3>
            <div className="text-center my-6">
                <span className={`text-5xl font-extrabold ${highlight ? 'text-red-600' : 'text-white'}`}>R$ {price}</span>
                <p className="text-gray-400 mt-1 uppercase text-sm tracking-wider">{priceSubtitle}</p>
            </div>
            <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${highlight ? 'text-red-600' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PricingCard;
