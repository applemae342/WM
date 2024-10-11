import CollectorHomeDashboard from "@/components/CollectorDashboardComponents/CollectorHomeDashboard";
import CollectorLocationDashboard from "@/components/CollectorDashboardComponents/ShareLocation"; // Ensure this points to the announcements view
import CollectorAnnouncementsDashboard from "@/components/CollectorDashboardComponents/ViewAnnouncements";
import AdminNavBar from "@/components/AdminNavbar";
import { HomeIcon, LocationIcon, StatusIcon } from "@/components/heroIcons/Icons";
import React, { useState } from "react";

const CollectorDashboard = () => {
    const [view, setView] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleViewAnnouncements = () => {
        setView("yourLocation"); // This should correspond to your announcements view
    };

    const renderView = () => {
        switch (view) {
            case "home":
                return <CollectorHomeDashboard onViewAnnouncements={handleViewAnnouncements} />;
            case "announcement":
                return <CollectorAnnouncementsDashboard />;
            case "yourLocation":
                return <CollectorLocationDashboard />; // This should display announcements
            default:
                return <CollectorHomeDashboard onViewAnnouncements={handleViewAnnouncements} />;
        }
    };

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className={`flex flex-col ${isCollapsed ? "w-[60px]" : "w-[200px]"} bg-gray-800 text-white transition-all duration-300`}>
                {/* Toggle Button */}
                <button onClick={toggleSidebar} className="p-2 text-white rounded-full self-end bg-gray-700">
                    {isCollapsed ? "→" : "←"}
                </button>

                {/* Sidebar Content */}
                <div className="flex flex-col w-full">
                    <button
                        onClick={() => setView("home")}
                        className="flex items-center w-full text-white py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <HomeIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Home"}
                    </button>
                    <button
                        onClick={() => setView("announcement")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <StatusIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Announcements"}
                    </button>
                    <button
                        onClick={handleViewAnnouncements} // Directly handle view announcements
                        className="text-nowrap flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <LocationIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Your Location"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="w-full">
                    <AdminNavBar />
                </div>
                <div className="flex-1 p-8 bg-slate-50 overflow-auto">
                    {/* Main content */}
                    <div className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm">{renderView()}</div>
                </div>
            </div>
        </div>
    );
};

export default CollectorDashboard;
