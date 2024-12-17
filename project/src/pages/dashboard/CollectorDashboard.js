import CollectorHomeDashboard from "@/components/CollectorDashboardComponents/CollectorHomeDashboard";
import CollectorLocationDashboard from "@/components/CollectorDashboardComponents/ShareLocation";
import CollectorNavBar from "@/components/collectorNavbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CollectorDashboard = () => {
    const [view, setView] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [truckData, setTruckData] = useState(null);
    const router = useRouter();

    // Toggle sidebar visibility
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
            case "yourLocation":
                return <CollectorLocationDashboard />;
            default:
                return <CollectorHomeDashboard onViewAnnouncements={handleViewAnnouncements} />;
        }
    };

    // Check if the truck is logged in using session data
    useEffect(() => {
        const truckSession = JSON.parse(sessionStorage.getItem("truckSession"));
        if (truckSession) {
            setTruckData(truckSession); // Set truck data from session
        } else {
            // Redirect to login if no session data is found
            router.push("/sign_in_page"); 
        }
    }, [router]);

    return (
        <div className="flex h-screen font-sans">
            <CollectorNavBar />
            <div
                className={`bg-gray-800 text-white shadow-md fixed z-50 h-full transition-all duration-300 ${isCollapsed ? "w-23" : "w-64"} top-[64px]`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-2">
                        <button onClick={toggleSidebar} className="focus:outline-none flex items-center">
                            <Image src="/images/hamburgermenu.png" alt="Menu" width={38} height={38} className="mr-2 ml-4" priority />
                        </button>
                    </div>
                    <div className="mt-2 flex-grow">
                        <ul className="space-y-4">
                            <li
                                className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "home" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                                onClick={() => setView("home")}
                            >
                                <Image src="/images/home.png" alt="Home" width={30} height={30} className="mr-2 ml-4" />
                                {!isCollapsed && <span className="text-lg ml-3 font-sans">Home</span>}
                            </li>
                            
                            <li
                                className={`flex items-center cursor-pointer p-2 rounded-md transition duration-200 ${view === "yourLocation" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                                onClick={handleViewAnnouncements}
                            >
                                <Image src="/images/location.png" alt="Your Location" width={37} height={37} className="mr-2 ml-3" />
                                {!isCollapsed && <span className="text-lg ml-2 font-sans">Your Location</span>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"} mt-[60px]`}>
                {/* Display truck data if available */}
                {truckData ? (
                    <div className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm mt-4 font-sans">
                        {renderView()}
                    </div>
                ) : (
                    <div className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm mt-4 font-sans">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectorDashboard;
