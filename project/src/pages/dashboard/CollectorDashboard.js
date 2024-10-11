import CollectorHomeDashboard from "@/components/CollectorDashboardComponents/CollectorHomeDashboard";
import CollectorLocationDashboard from "@/components/CollectorDashboardComponents/ShareLocation"; 
import CollectorAnnouncementsDashboard from "@/components/CollectorDashboardComponents/ViewAnnouncements";
import AdminNavBar from "@/components/AdminNavbar";
import Image from "next/image";
import { useState } from "react";

const CollectorDashboard = () => {
    const [view, setView] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleViewAnnouncements = () => {
        setView("yourLocation");
    };

    const renderView = () => {
        switch (view) {
            case "home":
                return <CollectorHomeDashboard onViewAnnouncements={handleViewAnnouncements} />;
            case "announcement":
                return <CollectorAnnouncementsDashboard />;
            case "yourLocation":
                return <CollectorLocationDashboard />;
            default:
                return <CollectorHomeDashboard onViewAnnouncements={handleViewAnnouncements} />;
        }
    };

    return (
        <div className="flex h-screen font-sans">
            <AdminNavBar /> {/* Place AdminNavBar at the top */}

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
                            />
                        </button>
                    </div>
                    {/* Sidebar Content */}
                    <div className="mt-2 flex-grow">
                        <ul className="space-y-4">
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "home" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("home")}>
                                <Image src="/images/home.png" alt="Home" width={30} height={30} className="mr-2 ml-4" />
                                {!isCollapsed && <span className="text-lg ml-3 font-sans">Home</span>} {/* Ensure font is Open Sans */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "announcement" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("announcement")}>
                                <Image src="/images/announcement.png" alt="Announcements" width={29} height={29} className="mr-2 ml-4" />
                                {!isCollapsed && <span className="text-lg ml-3 font-sans">Announcements</span>} {/* Ensure font is Open Sans */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "yourLocation" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={handleViewAnnouncements}>
                                <Image src="/images/location.png" alt="Your Location" width={37} height={37} className="mr-2 ml-3" />
                                {!isCollapsed && <span className="text-lg ml-2 font-sans">Your Location</span>} {/* Ensure font is Open Sans */}
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

export default CollectorDashboard;
