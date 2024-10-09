import React from "react";

const Card = ({ title, content }) => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
                <p className="text-base text-gray-700 text-center">{content}</p>
            </div>
        </div>
    );
};

export default Card;
