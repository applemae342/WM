import Link from "next/link";
import { useState } from "react";

const AdminNavBar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <nav className="fixed top-0 w-full bg-gray-50 shadow-md z-50 font-sans">
            <div className="flex items-center justify-start h-16 px-0"> {/* Use justify-between to push items to the ends */}
                <div className="flex items-center">
                    <Link href="/dashboard/AdminDashboard" passHref>
                        <img src="/images/system_logo.png" alt="Logo" className="h-28 w-28" /> {/* Logo size */}
                    </Link>
                    <Link href="/" passHref className="text-2xl -ml-6 font-semibold text-gray-800" style={{ fontSize: '18px' }}>
                        Waste Management Tracking System
                    </Link>
                </div>
                <div className="relative mr-4 ml-auto"> {/* Use ml-auto to push profile icon to the right */}
                    <img 
                        src="/images/user.png" 
                        alt="Profile" 
                        className="h-10 w-10 rounded-full cursor-pointer" 
                        onClick={toggleDropdown} 
                    />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-black p-2">
                            <ul>
                                <li>
                                    <Link href="/profile">My Profile</Link>
                                </li>
                                <li>
                                    <Link href="/">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavBar;
