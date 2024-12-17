import React, { useEffect, useState } from "react";
import MapViewAdmin from "../forAdminTruckLocationTracking";


const DashboardHome = () => {
    const [username, setUsername] = useState("");

    // Fetch the username from localStorage when the component mounts
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 font-sans">
            
            {/* Apply Open Sans font to the entire component */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                {/* Added background, padding, and shadow */}
                <h1 className="text-3xl font-bold text-green-700 text-center">Welcome, {username || "Admin"}!</h1>
                <p className="text-gray-600 text-center mt-2">We're glad to have you back. Let's manage your dashboard!</p>
            </div>
            <div className="p-4 flex justify-between items-center bg-white rounded-lg">
                
                
            </div>
            <div className="flex-1 ml-4">
                    <MapViewAdmin/>
                </div>
        </div>
    );
};

export default DashboardHome;
