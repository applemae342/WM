import AdminNavBar from "@/components/AdminNavbar";
import ResidentsHomeDashboard from "@/components/ResidentsDashboardComponents/ResidentsHomeDashboard";
import ResidentsLocationTrackingDashboard from "@/components/ResidentsDashboardComponents/ResidentsLocationTrackingDashboard";
import ResidentsReviews from "@/components/ResidentsDashboardComponents/ResidentsReviews";
import React, { useState } from "react";
import Image from "next/image"; // Import Image for the hamburger icon

const ResidentsDashboard = () => {
    const [view, setView] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderView = () => {
        switch (view) {
            case "home":
                return <ResidentsHomeDashboard />;
            case "locationTracking":
                return <ResidentsLocationTrackingDashboard />;
            case "reviews":
                return <ResidentsReviews />;
            default:
                return <ResidentsHomeDashboard />;
        }
    };

    return (
        <div className="flex h-screen font-sans"> {/* Apply Open Sans to the entire dashboard */}
            <AdminNavBar /> {/* Include the AdminNavBar at the top */}

            {/* Sidebar */}
            <div className={`bg-gray-800 text-white shadow-md fixed z-50 h-full transition-all duration-300 ${isCollapsed ? "w-23" : "w-64"} top-[64px]`}>
                <div className="flex flex-col h-full">
                    {/* Hamburger Menu Button */}
                    <div className="flex items-center justify-between p-2">
                        <button onClick={toggleSidebar} className="focus:outline-none flex items-center">
                            <Image 
                                src="/images/hamburgermenu.png" 
                                alt="Menu" 
                                width={38} 
                                height={38} 
                                className="mr-2 ml-4" 
                                priority 
                            /> {/* Hamburger image */}
                        </button>
                    </div>
                    {/* Sidebar Content */}
                    <div className="mt-2 flex-grow">
                        <ul className="space-y-4">
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "home" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("home")}>
                                <Image src="/images/home.png" alt="Home" width={30} height={30} className="mr-2 ml-4" /> {/* Home image */}
                                {!isCollapsed && <span className="text-lg ml-3 font-sans">Home</span>} {/* Ensure font is Open Sans */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "locationTracking" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("locationTracking")}>
                                <Image src="/images/location.png" alt="Location Tracking" width={37} height={37} className="mr-2 ml-3" /> {/* Location Tracking image */}
                                {!isCollapsed && <span className="text-lg ml-2 font-sans">Location Tracking</span>} {/* Ensure font is Open Sans */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "reviews" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("reviews")}>
                                <Image src="/images/announcement.png" alt="Reviews" width={29} height={29} className="mr-2 ml-4" /> {/* Reviews image */}
                                {!isCollapsed && <span className="text-lg ml-3 font-sans">Announcements</span>} {/* Ensure font is Open Sans */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"} mt-[60px]`}>
                <div className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm mt-4 font-sans">
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default ResidentsDashboard;
