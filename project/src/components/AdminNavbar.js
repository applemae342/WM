import Link from "next/link";
import { useState } from "react";

const AdminNavBar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <div className="border w-full shadow-lg  bg-white  text-black flex justify-between items-center">
            <div className="flex items-center">
                <Link href="/dashboard/AdminDashboard" passHref>
                    <img src="/images/system_logo.png" alt="Logo" className="h-16 w-20" />
                </Link>
                <div>Waste Management Tracking System</div>
            </div>
            <div className="relative mr-5 rounded-full">
                <img src="/images/spongebob.svg" alt="Profile" className="h-10 w-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
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
    );
};

export default AdminNavBar;
