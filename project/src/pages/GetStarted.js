import React, { useState, useEffect } from "react";
import SignInNavbar from "../components/SignInNavbar"; // Adjust the path as needed
import GettingStarted from "@/components/getStartedComponents/gettingStarted";
import SetupAccount from "@/components/getStartedComponents/setUpAccount";
import AddressConfig from "@/components/getStartedComponents/addressConfig";
import Image from "next/image";

const GetStarted = () => {
    const [activeSection, setActiveSection] = useState("gettingStarted");
    const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

    // Function to handle screen resize and update sidebar collapse state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true); // Collapse the sidebar for smaller screens
            } else {
                setIsCollapsed(false); // Expand the sidebar for larger screens
            }
        };

        // Attach resize event listener
        window.addEventListener("resize", handleResize);

        // Call it initially to set the correct state based on the current screen size
        handleResize();

        // Cleanup event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed); // Toggle sidebar state
    };

    const renderContent = () => {
        switch (activeSection) {
            case "gettingStarted":
                return <GettingStarted onStartClick={handleStartClick} />;
            case "setupAccount":
                return <SetupAccount onNextClick={handleNextClick} onBackClick={handleBackClick} />;
            case "addressConfig":
                return <AddressConfig onBackClick2={handleBackClick2} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen font-sans">
            <SignInNavbar />
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white shadow-md fixed z-50 h-full transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} top-[64px]`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-2">
                        <button onClick={toggleSidebar} className="focus:outline-none flex items-center">
                            <Image src="/images/hamburgermenu.png" alt="Menu" width={38} height={38} className="mr-2 ml-4" priority />
                        </button>
                    </div>
                    <div className="mt-4 flex-grow">
                        <ul className="space-y-2">
                            <li
                                className={`flex items-center cursor-pointer p-2 rounded-md transition-colors ${activeSection === "gettingStarted" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                                onClick={() => setActiveSection("gettingStarted")}
                            >
                                <Image src="/images/start.png" alt="Getting Started" width={30} height={30} className="mr-2 ml-4" />
                                {!isCollapsed && <span className="text-lg font-open-sans">Getting Started</span>}
                            </li>
                            <li
                                className={`flex items-center cursor-pointer p-2 rounded-md transition-colors ${activeSection === "setupAccount" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                                onClick={() => setActiveSection("setupAccount")}
                            >
                                <Image src="/images/account.png" alt="Setup Your Account" width={37} height={37} className="mr-2 ml-3" />
                                {!isCollapsed && <span className="text-lg font-open-sans">Announcement</span>}
                            </li>
                            <li
                                className={`flex items-center cursor-pointer p-2 rounded-md transition-colors ${activeSection === "addressConfig" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                                onClick={() => setActiveSection("addressConfig")}
                            >
                                <Image src="/images/location.png" alt="Address Configuration" width={37} height={37} className="mr-2 ml-3" />
                                {!isCollapsed && <span className="text-lg font-open-sans">Track Location</span>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`flex-1 p-6 -100 mt-[64px] transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>{renderContent()}</div>
        </div>
    );
};

export default GetStarted;
