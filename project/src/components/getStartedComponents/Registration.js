import React, { useState } from "react";
import SetupAccount from "./setUpAccount";
import AddressConfig from "./addressConfig";

const Registration = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [accountData, setAccountData] = useState({}); // Store user data here

    const handleNextClick = () => {
        setCurrentPage(1); // Move to the second page
    };

    const handleBackClick = () => {
        setCurrentPage(0); // Move back to the first page
    };

    const handleBackClick2 = () => {
        setCurrentPage(0); // Move back to the first page
    };

    const handleSubmit = (data) => {
        setAccountData(data); // Store user data from the first page
    };

    return (
        <div className="h-screen flex items-center justify-center">
            {currentPage === 0 ? (
                <SetupAccount onNextClick={handleNextClick} onBackClick={handleBackClick2} onSubmit={handleSubmit} />
            ) : (
                <AddressConfig onBackClick2={handleBackClick} accountData={accountData} />
            )}
        </div>
    );
};

export default Registration;
