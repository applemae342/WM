import AdminNavBar from "@/components/AdminNavbar";
import DashboardCollectionRoutes from "@/components/AdminDashboardComponents/AddRoutes";
import DashboardHome from "@/components/AdminDashboardComponents/DashboardHome";
import DashboardResidentsStatus from "@/components/AdminDashboardComponents/CollectorAndWasteRecords";
import DashboardUsers from "@/components/AdminDashboardComponents/DashboardUsers";
import DashboardReviews from "@/components/AdminDashboardComponents/Announcements";
import { HomeIcon, LocationIcon, StarIcon, StatusIcon, TrashIcon, UserIcon } from "@/components/heroIcons/Icons";
import { useState } from "react";
import Announcements from "@/components/AdminDashboardComponents/Announcements";

const AdminDashboard = () => {
    const [view, setView] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderView = () => {
        switch (view) {
            case "home":
                return <DashboardHome />;
            case "users":
                return <DashboardUsers />;
            case "residentsStatus":
                return <DashboardResidentsStatus />;
            case "collectionRoutes":
                return <DashboardCollectionRoutes />;
            case "announcements":
                return <Announcements />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className={`flex flex-col ${isCollapsed ? "w-[60px]" : "w-[200px]"} bg-gray-800 text-white  transition-all duration-300`}>
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
                        onClick={() => setView("users")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <UserIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Users"}
                    </button>
                    <button
                        onClick={() => setView("residentsStatus")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <StatusIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Admin Console "}
                    </button>
                    
                    <button
                        onClick={() => setView("collectionRoutes")}
                        className="flex items-center w-full py-3 px-4 text-left hover:bg-gray-600 focus:outline-none border-b border-gray-700"
                    >
                        <TrashIcon className="w-6 h-6 mr-4" />
                        {!isCollapsed && "Collection Routes"}
                    </button>
                    <button
                        onClick={() => setView("announcements")}
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

export default AdminDashboard;
