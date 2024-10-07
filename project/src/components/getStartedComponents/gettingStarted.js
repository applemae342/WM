import React from "react";

const GettingStarted = ({ onStartClick }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="text-center mb-6">
                <p className="text-2xl font-bold text-gray-800 mb-2">Get Started</p>
                <p className="text-gray-600">Let's begin your journey!</p>
            </div>
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                onClick={onStartClick}
            >
                Start
            </button>
        </div>
    );
};

export default GettingStarted;
