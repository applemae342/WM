import AdminNavBar from "@/components/AdminNavbar";
import DashboardCollectionRoutes from "@/components/AdminDashboardComponents/AddRoutes";
import DashboardHome from "@/components/AdminDashboardComponents/DashboardHome";
import DashboardResidentsStatus from "@/components/AdminDashboardComponents/DashboardResidentsStatus";
import DashboardUsers from "@/components/AdminDashboardComponents/DashboardUsers";
import { useState } from "react";
import Announcements from "@/components/AdminDashboardComponents/Announcements";
import Image from "next/image"; // Import Image for the hamburger icon

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
        <div className="flex h-screen font-sans">
            <AdminNavBar /> {/* Include the AdminNavBar at the top */}

            {/* Sidebar */}
            <div className={`bg-gray-800 text-white shadow-md fixed z-50 h-full transition-all duration-300 ${isCollapsed ? "w-23" : "w-64"} top-[64px]`}>
                <div className="flex flex-col h-full">
                    {/* Hamburger Menu Button */}
                    <div className="flex items-center justify-between p-2"> {/* Adjusted padding */}
                        <button onClick={toggleSidebar} className="focus:outline-none flex items-center">
                            <Image 
                                src="/images/hamburgermenu.png" 
                                alt="Menu" 
                                width={38} 
                                height={38} 
                                className="mr-2 ml-4" 
                                priority 
                            /> {/* Hamburger image now exactly 30x30 */}
                        </button>
                    </div>
                    {/* Sidebar Content */}
                    <div className="mt-2 flex-grow">
                        <ul className="space-y-4">
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "home" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("home")}>
                                <Image src="/images/home.png" alt="Home" width={30} height={30} className="mr-2 ml-4" /> {/* Home image */}
                                {!isCollapsed && <span className="text-lg ml-3">Home</span>} {/* Text for Home */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "users" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("users")}>
                                <Image src="/images/users.png" alt="Users" width={30} height={30} className="mr-2 ml-4" /> {/* Users image */}
                                {!isCollapsed && <span className="text-lg ml-3">Users</span>} {/* Text for Users */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "residentsStatus" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("residentsStatus")}>
                                <Image src="/images/records.png" alt="Residents Status" width={30} height={30} className="mr-2 ml-4" /> {/* Residents Status image */}
                                {!isCollapsed && <span className="text-lg ml-3">Records</span>} {/* Text for Residents Status */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "collectionRoutes" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("collectionRoutes")}>
                                <Image src="/images/location.png" alt="Collection Routes" width={37} height={37} className="mr-2 ml-3" /> {/* Collection Routes image */}
                                {!isCollapsed && <span className="text-lg ml-2">Collection Routes</span>} {/* Text for Collection Routes */}
                            </li>
                            <li className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "announcements" ? "bg-gray-600" : "hover:bg-gray-600"}`} onClick={() => setView("announcements")}>
                                <Image src="/images/announcement.png" alt="Announcements" width={29} height={29} className="mr-2 ml-4" /> {/* Announcements image */}
                                {!isCollapsed && <span className="text-lg ml-3">Announcements</span>} {/* Text for Announcements */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"} mt-[60px]`}>
                <div className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm mt-4">
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
