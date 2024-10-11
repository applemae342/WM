import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GettingStarted from "@/components/getStartedComponents/gettingStarted";
import SetupAccount from "@/components/getStartedComponents/setUpAccount";
import AddressConfig from "@/components/getStartedComponents/addressConfig";

const GetStarted = () => {
    const [activeSection, setActiveSection] = useState("gettingStarted");

    const handleStartClick = () => {
        setActiveSection("setupAccount");
    };

    const handleBackClick = () => {
        setActiveSection("gettingStarted");
    };
    const handleBackClick2 = () => {
        setActiveSection("setupAccount");
    };

    const handleNextClick = () => {
        setActiveSection("addressConfig");
    };

    const renderContent = () => {
        switch (activeSection) {
            case "gettingStarted":
                return <GettingStarted onStartClick={handleStartClick} />;
            case "setupAccount":
                return <SetupAccount onNextClick={handleNextClick} onBackClick={handleBackClick} />;
            case "addressConfig":
                return <AddressConfig onBackClick2={handleBackClick2} />;
        }
    };

    return (
        <div className="flex h-screen">
            <Navbar />
            <div className="bg-gray-800 text-white w-64 shadow-md">
                <div className="mt-32">
                    <ul className="space-y-2">
                        <li
                            className={`cursor-pointer p-2 rounded-md transition-colors ${
                                activeSection === "gettingStarted" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveSection("gettingStarted")}
                        >
                            Getting Started
                        </li>
                        <li
                            className={`cursor-pointer p-2 rounded-md transition-colors ${
                                activeSection === "setupAccount" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveSection("setupAccount")}
                        >
                            Setup Your Account
                        </li>
                        <li
                            className={`cursor-pointer p-2 rounded-md transition-colors ${
                                activeSection === "addressConfig" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveSection("addressConfig")}
                        >
                            Address Configuration
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-6 bg-gray-100 mt-20">{renderContent()}</div>
        </div>
    );
};

export default GetStarted;
