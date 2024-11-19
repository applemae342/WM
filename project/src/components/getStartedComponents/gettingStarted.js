import React from "react";

const GettingStarted = ({ onStartClick }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center transform transition-all hover:scale-105 duration-300 ease-out">
                <p className="text-4xl font-bold text-gray-800 mb-4">Get Started</p>
                <p className="text-lg text-gray-500 mb-8">Ready to begin your journey? Let’s make it happen!</p>
                <button
                    className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-all duration-300 ease-in-out w-full sm:w-auto"
                    onClick={onStartClick}
                >
                    Start
                </button>
            </div>
        </div>
    );
};

export default GettingStarted;
