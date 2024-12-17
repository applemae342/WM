import Link from "next/link";
import { useState, useEffect } from "react";

const CollectorNavBar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [truckUsername, setTruckUsername] = useState(""); // Initialize the truckUsername state
    const [truckData, setTruckData] = useState({}); // Initialize truckData to store truck details

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        // Get truck session data from sessionStorage
        const truckSession = JSON.parse(sessionStorage.getItem("truckSession"));

        // Check if session data exists
        if (truckSession) {
            setTruckData(truckSession); // Set truck data from session
            setTruckUsername(truckSession.truckUsername); // Set truck username
        } else {
            // Optionally redirect to login page if no session data exists
            window.location.href = "/sign_in_page"; // Redirect if session doesn't exist
        }
    }, []);  // This useEffect will run once when the component mounts

    const handleLogout = async () => {
        // Clear the session storage
        sessionStorage.removeItem("truckSession");
        
        // Optionally redirect to login page
        window.location.href = "/sign_in_page"; // Redirect to login after logout

        // Send a logout request to the backend to destroy the session on the server
        try {
            const response = await fetch("http://localhost:8000/API/loginTruck/logout", { method: "POST" });
            if (response.ok) {
                console.log("Logout successful");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-gray-50 shadow-md z-50 font-sans">
            <div className="flex items-center justify-start h-16 px-0">
                {/* Use justify-between to push items to the ends */}
                <div className="flex items-center">
                    <Link href="/dashboard/CollectorDashboard" passHref>
                        <img src="/images/system_logo.png" alt="Logo" className="h-28 w-28" /> {/* Logo size */}
                    </Link>
                    <Link href="/" passHref className="text-2xl -ml-6 font-semibold text-gray-800" style={{ fontSize: "18px" }}>
                        Waste Management Tracking System
                    </Link>
                </div>

                <div className="relative mr-4 ml-auto flex items-center">
                    {/* Username displayed before the profile icon */}
                    <h1 className="text-lg font-bold text-black mr-5">{truckUsername}</h1> {/* Smaller, black text */}
                    <img 
                        src="/images/user.png" 
                        alt="Profile" 
                        className="h-10 w-10 rounded-full cursor-pointer" 
                        onClick={toggleDropdown} 
                    />

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-12 w-48 top-0 bg-white border border-gray-200 rounded-lg shadow-lg text-black p-2">
                            <ul>
                                <li>
                                    <Link href="/profile">My Profile</Link>
                                </li>
                                <li>
                                    <a href="#" onClick={handleLogout}>Log Out</a> {/* Log Out Action */}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CollectorNavBar;
