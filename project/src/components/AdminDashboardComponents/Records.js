import React, { useState } from "react";
import RecordForGarbage from "../recordsGarbage";
import FuelRecords from "../fuelRecords"; // Capitalized component name


// NavBar Component
const NavBar = ({ onNavClick }) => {
    return (
        <div className="flex justify-around bg-gray-800 p-4 text-white mb-4">
            <div
                className="cursor-pointer hover:text-gray-400"
                onClick={() => onNavClick("garbage")}
            >
                Garbage Volume Record
            </div>
            <div
                className="cursor-pointer hover:text-gray-400"
                onClick={() => onNavClick("permissions")}
            >
                Fuel Permission Releases Records
            </div>
            
        </div>
    );
};

// Main Records Component
const Records = () => {
    const [activeSection, setActiveSection] = useState("garbage"); // State to manage active section

    // Handle navigation click
    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="p-4">
            {/* Top Navigation Bar */}
            <NavBar onNavClick={handleNavClick} />

            {/* Display content based on the selected section */}
            {activeSection === "garbage" && (
                <div className="flex-1 ml-4">
                    <RecordForGarbage />
                </div>
            )}

            {/* Content for Permissions */}
            {activeSection === "permissions" && (
                <div>
                    <FuelRecords />
                </div>
            )}
        </div>
    );
};

export default Records;
