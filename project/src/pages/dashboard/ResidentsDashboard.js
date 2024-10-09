import AdminNavBar from "@/components/AdminNavbar";
import { HomeIcon, StarIcon, StatusIcon } from "@/components/heroIcons/Icons";
import ResidentsHomeDashboard from "@/components/ResidentsDashboardComponents/ResidentsHomeDashboard";
import ResidentsReviews from "@/components/ResidentsDashboardComponents/ViewAnnouncements";
import ResidentsUpdateStatusDashboard from "@/components/ResidentsDashboardComponents/ResidentsUpdateStatusDashboard";
import React, { useState } from "react";

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
            case "updateStatus":
                return <ResidentsUpdateStatusDashboard />;
            case "schedules":
                return <ResidentsScheduleDashboard />;
            case "reviews":
                return <ResidentsReviews />;
            default:
                return <ResidentsHomeDashboard />;
        }
    };

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className={`flex flex-col ${isCollapsed ? "w-[60px]" : "w-[200px]"} bg-gray-800 text-white transition-all duration-300`}>
                {/* Toggle Button */}
                <button onClick={toggleSidebar} className="bg-gray-700 p-2 text-white rounded-full self-end mb-4">
                    {isCollapsed ? "→" : "←"}
                </button>

                {/* Sidebar Content */}
                <div className="flex flex-col w-full">
                    <button
                        onClick={() => setView("home")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <HomeIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Home"}
                    </button>
                  
                    <button
                        onClick={() => setView("updateStatus")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <StatusIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Update Status"}
                    </button>
                    
                    <button
                        onClick={() => setView("reviews")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <StarIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Announcements"}
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

export default ResidentsDashboard;
